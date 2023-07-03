import { useNavigate } from "react-router-dom";
import { Navbar, PageSpinner, TextInput } from "../components";
import { subjectService, userService } from "../services";
import { useEffect, useState } from "react";
import { SubjectData, UserData } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { toast } from "react-toastify";

interface SubjectFormData {
  name: string;
  desc: string;
  user_id: string;
}

function SubjectsCreate() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { data } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (data) {
        try {
          const response = await userService.getCurrentUser(data);
          setUserData(response);
        } catch (err: unknown) {
          toast.error((err as Error).message);
          throw Error((err as Error).message);
        }
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleOnExit = (e: unknown) => {
    (e as FormDataEvent).preventDefault();
    navigate(-1);
  };

  const handleOnSubmit = async (e: unknown) => {
    (e as FormDataEvent).preventDefault();

    if (data) {
      const newSubject: SubjectFormData = {
        name: name,
        desc: desc,
        user_id: userData?._id as string,
      };

      try {
        const response = await subjectService.createSubject(
          newSubject as SubjectData,
          data
        );
        console.log(response);
        toast.success("Successfuly created new subject");
        navigate("/subjects");
      } catch (err: unknown) {
        toast.error((err as Error).message);
        throw Error((err as Error).message);
      }
    }
  };

  const handleNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="flex max-h-full flex-col overflow-y-auto px-4 py-20 lg:mt-8 lg:px-64 xl:mt-0 xl:w-full xl:flex-1 xl:px-96 xl:pt-12">
        <div className="">
          <h1 className={`font-inter text-3xl font-bold text-red-500`}>
            Create Subject
          </h1>
          <p className={`mt-2 font-sans text-gray-500`}>
            Create a subject for easy sorting of reviewers
          </p>
        </div>
        <form className="mt-8 flex flex-col" onSubmit={handleOnSubmit}>
          <TextInput
            title="Subject Code"
            htmlName="name"
            placeholder="Enter name of subject"
            value={name}
            onChange={handleNameOnChange}
          />
          <TextInput
            title="Description"
            htmlName="desc"
            placeholder="Enter name of subject"
            value={desc}
            onChange={handleDescOnChange}
          />
          <div className="flex h-14 w-full items-center justify-between">
            <button
              onClick={handleOnExit}
              className={`first-letter h-full w-36 rounded-md border-2 border-red-500 bg-white px-4 font-inter font-bold text-red-400 shadow-md xl:w-36 xl:text-sm`}
            >
              Exit
            </button>
            <button
              type="submit"
              className={`first-letter h-full rounded-md bg-red-500 px-4 font-inter text-sm font-bold text-white shadow-md xl:w-36 xl:text-sm`}
            >
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SubjectsCreate;
