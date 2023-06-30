import { MockCard, Navbar, PageSpinner, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { mockService, subjectService } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { MockData, SubjectData, UserData } from "../types";
import moment from "moment";

function HomeProfileCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md grid grid-cols-2">
      <div className="bg-slate-400"></div>
      <div className="h-full flex flex-col">
        <div className="p-4">
          <p className="font-inter text-slate-600 font-bold">
            Mark Christian Avila
          </p>
          <p className="font-inter text-slate-600 text-sm">TUPM-20-2120</p>
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
    if (mockData && subjectData) {
      setIsLoading(false);
    }
  }, [mockData, subjectData]);

  const convertDate = (originalDate: string) => {
    const formattedDate = moment(originalDate).format("DD/MM/YYYY");

    return formattedDate; // Output: 29/06/2023
  };

  function limitString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str; // Return the original string if it is shorter or equal to the maxLength
    } else {
      const truncatedString = str.substring(0, maxLength); // Get the substring up to the maxLength
      return truncatedString + "..."; // Append '...' to the truncated string
    }
  }

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
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <MockCard
            showRecent
            title="Data Structures and algorithms"
            creator="Jeeve Bentic"
            subject="CS123"
            items="50"
            created="30/06/2023"
          />
          <HomeProfileCard />
        </div>
        <div className="mt-8">
          <SectionHeader>User created Mocks</SectionHeader>
          <ul className="grid grid-cols-3 gap-4 mt-4">
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
              />
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <SectionHeader>Subjects</SectionHeader>

          <ul className="grid grid-cols-4 gap-4 mt-4">
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;
