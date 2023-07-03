import { useSelector } from "react-redux";
import { Navbar, PageSpinner, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useState, useEffect } from "react";
import { RootState } from "../main";
import { subjectService } from "../services";
import { SubjectData } from "../types";
import { createSearchParams, useNavigate } from "react-router-dom";

function Subjects() {
  const { data } = useSelector((state: RootState) => state.auth);

  const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleItemClick = (slug: string, title: string) => {
    navigate({
      pathname: "/mocks",
      search: createSearchParams({
        title: title,
        subject: slug,
      }).toString(),
    });
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <div className="flex h-fit w-full items-center justify-between">
          <SectionHeader>
            Browse <span className="text-red-400">subjects</span>
          </SectionHeader>
        </div>
        <ul className="mt-4 grid grid-cols-4 gap-4">
          {(subjectData as SubjectData[]).map((item: SubjectData) => (
            <SubjectCard
              key={item._id}
              name={item.name}
              desc={item.desc}
              onClick={() => handleItemClick(item.name, item.slug)}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default Subjects;
