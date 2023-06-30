import { useSelector } from "react-redux";
import { MockCard, Navbar, PageSpinner } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { RootState } from "../main";
import { mockService } from "../services";
import { MockData, SubjectData, UserData } from "../types";
import { convertDate, limitString } from "../utils";

function Mocks() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [mockData, setMockData] = useState<MockData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (mockData) {
      setIsLoading(false);
    }
  }, [mockData]);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <SectionHeader>
          Browse user created <span className="text-red-400">Mocks</span>
        </SectionHeader>
        <ul className="grid grid-cols-3 mt-4">
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
      </main>
    </>
  );
}

export default Mocks;
