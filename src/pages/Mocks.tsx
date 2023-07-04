import { useSelector } from "react-redux";
import { MockCard, Navbar, PageSpinner } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { RootState } from "../main";
import { mockService, userService } from "../services";
import { MockData, SubjectData, UserData } from "../types";
import { convertDate, limitString } from "../utils";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Mocks() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [mockData, setMockData] = useState<MockData[] | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (data) {
        try {
          const response = await userService.getCurrentUser(data);
          setUserData(response);
        } catch (err: unknown) {
          throw Error((err as Error).message);
        }
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const getMockData = async () => {
      if (data && userData) {
        try {
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
      }
    };

    getMockData();
  }, [data, userData]);

  useEffect(() => {
    if (mockData) {
      setIsLoading(false);
    }
  }, [mockData]);

  const onMockStart = (id: string) => {
    navigate({
      pathname: "/mocks/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  const handleIsLoading = (isLoading: boolean) => setIsLoading(isLoading);

  const handleOnCreateNew = () => {
    navigate("/mocks/create");
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="flex h-full flex-col px-4 xl:px-48 xl:pt-10">
        <div className="mt-8 flex h-fit w-full flex-col md:flex-row md:items-center md:justify-between ">
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
          <button
            onClick={handleOnCreateNew}
            className="mt-4 rounded-md bg-red-500 px-4 py-2 font-inter font-bold text-white shadow-md shadow-gray-300 transition ease-in-out hover:bg-red-600 md:mt-0"
          >
            Create new
          </button>
        </div>

        {mockData?.length !== 0 && (
          <ul className="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {(mockData as MockData[]).map((item: MockData) => (
              <MockCard
                handleLoading={handleIsLoading}
                id={item._id}
                curr_user_id={userData?._id as string}
                creator_id={(item.author as UserData)._id}
                key={item._id}
                title={item.title}
                onStart={() => onMockStart(item._id)}
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
          <div className="flex h-3/4 w-full flex-col items-center justify-center">
            <h1 className="mb-8 font-inter text-7xl font-bold text-slate-400">{`:(`}</h1>
            <h1 className="font-inter text-3xl font-bold text-slate-400">
              Oops! Nothing found
            </h1>
          </div>
        )}
      </main>
    </>
  );
}

export default Mocks;
