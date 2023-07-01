import { MockCard, Navbar, PageSpinner, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { mockService, subjectService } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { MockData, SubjectData, UserData } from "../types";
import moment from "moment";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { convertDate, limitString } from "../utils";

function HomeProfileCard() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-slate-400"></div>
      <div className="flex h-full flex-col">
        <div className="p-4">
          <p className="font-inter font-bold text-slate-600">
            Mark Christian Avila
          </p>
          <p className="font-inter text-sm text-slate-600">TUPM-20-2120</p>
        </div>
        <div className="mt-auto h-14 border-t-2 border-slate-300">
          <button className="h-full w-fit px-4 font-bold text-red-400">
            Visit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [mockData, setMockData] = useState<MockData[] | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getMockData = async () => {
      try {
        if (!data) {
          throw Error("Token not found");
        }

        const response = await mockService.getMocks({
          token: data,
          populate: "subject author",
          excludePopulate: "-password -gender -createdAt -updatedAt",
          excludeLocal: "-items",
        });
        setMockData(response);
      } catch (err: unknown) {
        throw Error((err as Error).message);
      }
    };

    getMockData();
  }, [data]);

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
    if (mockData !== null && subjectData !== null) {
      setIsLoading(false);
    }
  }, [mockData, subjectData]);

  const onMockStart = (id: string) => {
    navigate({
      pathname: "/mocks/answer",
      search: createSearchParams({
        id: id,
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
        <SectionHeader>
          Hello there!{" "}
          <span className="text-red-500">Mark Christian Avila</span>
        </SectionHeader>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <MockCard
            showRecent
            title="Data Structures and algorithms"
            creator="Jeeve Bentic"
            subject="CS123"
            items="50"
            created="30/06/2023"
            onStart={() => {
              return;
            }}
          />
          <HomeProfileCard />
        </div>
        <div className="mt-8">
          <SectionHeader>User created Mocks</SectionHeader>
          <ul className="mt-4 grid grid-cols-3 gap-4">
            {(mockData as MockData[]).map((item: MockData) => (
              <MockCard
                key={item._id}
                title={item.title}
                creator={`${(item.author as UserData).fname} ${
                  (item.author as UserData).lname
                }`}
                subject={limitString((item.subject as SubjectData).name, 12)}
                items={item.count.toString()}
                created={convertDate(item.createdAt)}
                onStart={() => onMockStart(item._id)}
              />
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <SectionHeader>Subjects</SectionHeader>

          <ul className="mt-4 grid grid-cols-4 gap-4">
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
        </div>
      </main>
    </>
  );
}

export default Home;
