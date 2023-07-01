import { useSelector } from "react-redux";
import { Navbar, PageSpinner } from "../components";
import { useState, useEffect } from "react";
import { RootState } from "../main";
import { userService } from "../services";
import { UserData } from "../types";

interface ProfileItem {
  label: string;
  value: string;
}

function ProfileItem({ label, value }: ProfileItem) {
  return (
    <li className="flex h-14 items-center justify-between border-t-2 border-gray-200 p-4">
      <p className="text-left text-gray-400">{label}: </p>
      <p className="text-right text-gray-400">{value}</p>
    </li>
  );
}

function Profile() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

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
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleGender = (gender: string) => {
    return gender === "1" ? "Male" : "Female";
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-[75%] w-full items-center justify-center">
        <main className="flex w-96 flex-col items-center rounded-lg bg-white shadow-md">
          <header className="flex items-center gap-8 p-4">
            <div className="h-14 w-14 rounded-full bg-gray-500"></div>
            <div>
              <button className="font-sans text-sm text-gray-500 hover:text-gray-700">
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
              value={handleGender(userData?.gender || "1")}
            />
          </ul>
        </main>
      </div>
    </>
  );
}

export default Profile;
