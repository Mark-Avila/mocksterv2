import { MockCard, Navbar, PageSpinner, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";
import { useEffect, useState } from "react";
import { mockService, subjectService, userService } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { MockData, SubjectData, UserData } from "../types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { convertDate, limitString } from "../utils";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

interface HomeProfileCardProps {
  uri: string;
  name: string;
  tupid: string;
  onClick: (e: unknown) => void;
  role: 0 | 1 | 2;
}

function HomeProfileCard({
  uri,
  onClick,
  name,
  tupid,
  role,
}: HomeProfileCardProps) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="h-fit bg-slate-400">
        <img src={uri} alt="home-user-profile" />
      </div>
      <div className="flex h-full flex-col">
        <div className="p-4">
          <p className="font-inter font-bold text-slate-600">{name}</p>
          <p className="font-inter text-sm text-slate-600">{tupid}</p>
          <div className="mt-2 w-fit">
            {role === 0 && (
              <p className="w-full rounded-md bg-red-500 px-2 py-1 text-center text-sm font-bold text-white">
                Student
              </p>
            )}
            {role === 1 && (
              <p className="w-full rounded-md bg-yellow-500 px-2 py-1 text-center text-sm font-bold text-white">
                Teacher
              </p>
            )}
            {role === 2 && (
              <p className="w-full rounded-md bg-cyan-400 px-2 py-1 text-center text-sm font-bold text-white">
                Admin
              </p>
            )}
          </div>
        </div>
        <div className="mt-auto h-14 border-t-2 border-slate-300">
          <button
            onClick={onClick}
            className="h-full w-fit px-4 font-bold text-red-400"
          >
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
  const [userData, setUserData] = useState<UserData | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getMockData = async () => {
      if (data) {
        try {
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
      }
    };

    getMockData();
  }, [data]);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (data) {
        const response: UserData = await userService.getCurrentUser(data);
        setUserData(response);
        const newAvatar = createAvatar(thumbs, {
          seed: response._id,
        });
        const avatarURI = await newAvatar.toDataUri();
        setAvatar(avatarURI);
      }
    };

    getCurrentUser();
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
    if (mockData && subjectData && avatar && userData) {
      setIsLoading(false);
    }
  }, [mockData, subjectData, avatar, userData]);

  const handleItemClick = (slug: string, title: string) => {
    navigate({
      pathname: "/mocks",
      search: createSearchParams({
        title: title,
        subject: slug,
      }).toString(),
    });
  };

  const onMockStart = (id: string) => {
    navigate({
      pathname: "/mocks/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  const handleIsLoading = (isLoading: boolean) => setIsLoading(isLoading);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <main className="mt-12 px-4 pb-8 lg:pb-16 xl:px-48">
        <SectionHeader>
          Hello there!{" "}
          <span className="text-red-500">
            {userData?.fname} {userData?.lname}
          </span>
        </SectionHeader>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {mockData && (
            <MockCard
              role={(mockData[0].author as UserData).role}
              id={(mockData[0] as MockData)._id}
              key={(mockData[0] as MockData)._id}
              curr_user_id={userData?._id as string}
              creator_id={(mockData[0].author as UserData)._id}
              handleLoading={handleIsLoading}
              title={(mockData[0] as MockData).title}
              creator={`${
                ((mockData[0] as MockData).author as UserData).fname
              } ${((mockData[0] as MockData).author as UserData).lname}`}
              subject={limitString(
                ((mockData[0] as MockData).subject as SubjectData).name,
                12
              )}
              items={(mockData[0] as MockData).count.toString()}
              created={convertDate((mockData[0] as MockData).createdAt)}
              onStart={() => onMockStart((mockData[0] as MockData)._id)}
            />
          )}
          <HomeProfileCard
            name={`${userData?.fname} ${userData?.lname}`}
            tupid={userData?.tupid as string}
            role={userData?.role as 0 | 1 | 2}
            onClick={() => {
              navigate("/profile");
            }}
            uri={avatar as string}
          />
        </div>
        <div className="mt-8">
          <SectionHeader>User created Mocks</SectionHeader>
          <ul className="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {(mockData as MockData[]).map((item: MockData) => (
              <MockCard
                role={userData?.role as 0 | 1 | 2}
                id={item._id}
                curr_user_id={userData?._id as string}
                creator_id={(item.author as UserData)._id}
                handleLoading={handleIsLoading}
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

          <ul className="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
            {(subjectData as SubjectData[]).map((item: SubjectData) => (
              <SubjectCard
                key={item._id}
                name={item.name}
                desc={item.desc}
                onClick={() => handleItemClick(item.name, item.slug)}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;
