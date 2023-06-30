import { useSelector } from "react-redux";
import { Navbar, PageSpinner, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useState, useEffect } from "react";
import { RootState } from "../main";
import { subjectService } from "../services";
import { SubjectData } from "../types";

function Subjects() {
  const { data } = useSelector((state: RootState) => state.auth);

  const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        if (!data) {
          throw Error("Token not found");
        }
        const response = await subjectService.getSubjects(data);
        setSubjectData(response);
      } catch (err: unknown) {
        throw Error((err as Error).message);
      }
    };

    getSubjects();
  }, [data]);

  useEffect(() => {
    if (subjectData) {
      setIsLoading(false);
    }
  }, [subjectData]);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <SectionHeader>
          Browse <span className="text-red-400">subjects</span>
        </SectionHeader>
        <ul className="grid grid-cols-4 gap-4 mt-4">
          {(subjectData as SubjectData[]).map((item: SubjectData) => (
            <SubjectCard
              key={item._id}
              name={item.name}
              desc={item.desc}
              onClick={() => {
                return;
              }}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default Subjects;
