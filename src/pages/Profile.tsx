import { useSelector } from "react-redux";
import { MockCard, Navbar, PageSpinner } from "../components";
import { useState, useEffect } from "react";
import { RootState } from "../main";
import { mockService, resultService, userService } from "../services";
import { MockData, ResultData, SubjectData, UserData } from "../types";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { toast } from "react-toastify";
import SectionHeader from "../components/SectionHeader";
import { convertDate, limitString } from "../utils";
import { createSearchParams, useNavigate } from "react-router-dom";

interface ProfileItem {
  label: string;
  value: string;
}

function ProfileItem({ label, value }: ProfileItem) {
  return (
    <li className="flex h-fit flex-col items-center justify-between border-t-2 border-gray-200 p-4 md:h-14 md:flex-row">
      <p className="text-left text-gray-400">{label}: </p>
      <p className="text-right text-gray-400">{value}</p>
    </li>
  );
}

interface HistoryItemProps {
  subject: string;
  score: string;
  date: string;
  onClick: () => void;
}

function HistoryItem({ subject, score, date, onClick }: HistoryItemProps) {
  return (
    <li className="w-full">
      <div className="grid h-fit grid-cols-4 border-t-2 border-gray-200  px-4 py-3 font-inter text-sm text-slate-500">
        <p>{subject}</p>
        <p>{score}</p>
        <p>{date}</p>
        <button
          onClick={onClick}
          className="w-24 text-sm font-bold text-red-400"
        >
          View
        </button>
      </div>
    </li>
  );
}

function Profile() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mockData, setMockData] = useState<MockData[] | null>(null);
  const [resultsData, setResultsData] = useState<ResultData[] | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      if (data) {
        try {
          const response = await userService.getCurrentUser(data);
          setUserData(response);
        } catch (err: unknown) {
          throw Error((err as Error).message);
        }
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getAvatar = async () => {
      if (userData) {
        const newAvatar = createAvatar(thumbs, {
          seed: userData._id,
        });

        const avatarURI = await newAvatar.toDataUri();

        setAvatar(avatarURI);
      }
    };

    getAvatar();
  }, [userData]);

  useEffect(() => {
    const getResults = async () => {
      if (userData && data) {
        const response = await resultService.getResultByUser({
          token: data,
          populate: "reviewer",
          excludePopulate: "-password -gender -createdAt -updatedAt",
          excludeLocal: "",
          user_id: userData._id,
        });
        setResultsData(response);
      }
    };

    getResults();
  }, [userData]);

  useEffect(() => {
    const getMocks = async () => {
      if (userData && data) {
        const mocks = await mockService.getMocksByUserId({
          token: data,
          populate: "subject author",
          excludePopulate: "-password -gender -createdAt -updatedAt",
          excludeLocal: "-items",
          id: userData._id,
        });
        setMockData(mocks);
      }
    };

    getMocks();
  }, [userData, data]);

  useEffect(() => {
    if (userData && avatar && mockData && resultsData) {
      setIsLoading(false);
    }
  }, [userData, avatar, mockData, resultsData]);

  const handleGender = (gender: number) => {
    return gender === 1 ? "Male" : "Female";
  };

  const onMockStart = (id: string) => {
    navigate({
      pathname: "/mocks/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  const handleHistoryView = (id: string) => {
    navigate({
      pathname: "/mocks/result",
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
      <div className="box-border grid h-full w-full grid-cols-1 p-4 xl:grid-cols-4 xl:gap-12 xl:p-12">
        <aside className="flex h-fit flex-col items-center rounded-lg bg-white shadow-md">
          <header className="flex items-center gap-8 p-4">
            <div className="h-14 w-14 overflow-hidden rounded-full">
              <img
                src={avatar as string}
                alt="user-profile"
                className="h-full w-full"
              />
            </div>
            <div>
              <button
                onClick={() => toast.info("Under maintenance")}
                className="font-sans text-sm text-gray-500 hover:text-gray-700"
              >
                Edit profile
              </button>
            </div>
          </header>
          <ul className="w-full">
            <ProfileItem label="First Name" value={userData?.fname || ""} />
            <ProfileItem label="Last Name" value={userData?.lname || ""} />
            <ProfileItem label="TUP-ID" value={userData?.tupid || ""} />
            <ProfileItem
              label="Gender"
              value={handleGender(parseInt(userData?.gender as string) || 1)}
            />
          </ul>
        </aside>
        <div className="col-span-3 mt-4 xl:mt-0">
          <div className="flex flex-col">
            <SectionHeader>History</SectionHeader>
            <ul className="mt-4 flex h-fit flex-col overflow-hidden rounded-md bg-white shadow-md">
              <li className="w-full">
                <div className="grid h-fit grid-cols-4  px-4 py-4 font-inter text-sm font-bold text-slate-500">
                  <p>Subject</p>
                  <p>Score</p>
                  <p>Date</p>
                </div>
              </li>
              {resultsData?.map((item) => (
                <HistoryItem
                  key={item._id}
                  subject={limitString((item.reviewer as MockData).title, 30)}
                  score={`${item.score.toString()}/${item.total.toString()}`}
                  date={convertDate(item.createdAt as string)}
                  onClick={() => handleHistoryView(item._id as string)}
                />
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col">
            <SectionHeader>Reviewers Made</SectionHeader>
            <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
        </div>
      </div>
    </>
  );
}

export default Profile;
