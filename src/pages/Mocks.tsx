import { useSelector } from "react-redux";
import { MockCard, Navbar, PageSpinner } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { RootState } from "../main";
import { mockService } from "../services";
import { MockData, SubjectData, UserData } from "../types";
import { convertDate, limitString } from "../utils";
import { useSearchParams } from "react-router-dom";

function Mocks() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [mockData, setMockData] = useState<MockData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getMockData = async () => {
      try {
        if (!data) {
          throw Error("Token not found");
        }

        if (searchParams.has("title")) {
          const response = await mockService.getMocksBySubject({
            token: data,
            populate: "subject author",
            excludePopulate: "-password -gender -createdAt -updatedAt",
            excludeLocal: "-items",
            slug: searchParams.get("title") as string,
          });

          setMockData(response);
          return;
        }

        const response = await mockService.getMocks({
          token: data,
          populate: "subject author",
          excludePopulate: "-password -gender -createdAt -updatedAt",
          excludeLocal: "-items",
        });

        setMockData(response);
        return;
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
      <main className="px-4 xl:px-48 xl:pt-16 h-full flex flex-col">
        {searchParams.has("subject") ? (
          <SectionHeader>
            <span className="text-red-400">Mocks</span> for "
            {searchParams.get("subject")}"
          </SectionHeader>
        ) : (
          <SectionHeader>
            Browse user created <span className="text-red-400">Mocks</span>
          </SectionHeader>
        )}
        {mockData?.length !== 0 && (
          <ul className="grid grid-cols-3 mt-4">
            {(mockData as MockData[]).map((item: MockData) => (
              <MockCard
                key={item._id}
                title={item.title}
                creator={
                  Array.isArray(item.author)
                    ? `${(item.author[0] as UserData).fname} ${
                        (item.author[0] as UserData).lname
                      }`
                    : `${(item.author as UserData).fname} ${
                        (item.author as UserData).lname
                      }`
                }
                subject={limitString(
                  Array.isArray(item.subject)
                    ? (item.subject[0] as SubjectData).name
                    : (item.subject as SubjectData).name,
                  12
                )}
                items={item.count.toString()}
                created={convertDate(item.createdAt)}
              />
            ))}
          </ul>
        )}
        {mockData?.length === 0 && (
          <div className="w-full h-3/4 flex items-center justify-center flex-col">
            <h1 className="text-7xl mb-8 font-inter font-bold text-slate-400">{`:(`}</h1>
            <h1 className="text-3xl font-inter font-bold text-slate-400">
              Oops! Nothing found
            </h1>
          </div>
        )}
      </main>
    </>
  );
}

export default Mocks;
