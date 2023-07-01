import { createContext, useState, useEffect } from "react";
import {
  CreateCallbacksInterface,
  MockCreateData,
  MockData,
  QuestionBody,
  QuestionChoice,
  SubjectData,
  Tabs,
  UserData,
} from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import { toast } from "react-toastify";
import { mockService, subjectService, userService } from "../services";
import { MockCreateDetails, Navbar, PageSpinner } from "../components";
import MockCreateTabs from "../components/MockCreateTabs";
import MockCreateQues from "../components/MockCreateQues";
import { useNavigate } from "react-router-dom";

export const CreateCallbacksContext = createContext<CreateCallbacksInterface>(
  {} as CreateCallbacksInterface
);

function MockCreate() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<MockCreateData>({
    title: "",
    subject: "",
    desc: "",
  });

  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<QuestionChoice[]>([
    {
      id: "1234",
      text: "",
    },
  ]);
  const [correct, setCorrect] = useState<string>("");

  const [questions, setQuestions] = useState<QuestionBody[]>(
    [] as QuestionBody[]
  );

  const [tab, setTab] = useState<Tabs>("details");

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (data) {
          const response = await userService.getCurrentUser(data);
          setUserData(response);
        }
      } catch (err: unknown) {
        throw Error("Failed to fetch user data in mocks/create");
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        if (data) {
          const response = await subjectService.getSubjects(data);
          setSubjectData(response);
        }
      } catch (err: unknown) {
        throw Error("Failed to fetch user data in mocks/create");
      }
    };

    getSubjects();
  }, []);

  useEffect(() => {
    if (userData && subjectData) {
      setIsLoading(false);
    }
  }, [subjectData, userData]);

  const generateRandomId = () => {
    const min = 1000;
    const max = 9999;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setQuestion(e.target.value);

  const onCorrectChange = (id: string) => setCorrect(id);

  const onAddChoice = () => {
    let id = "";

    do {
      id = generateRandomId();
    } while (choices.some((obj) => obj.id === id));

    const newChoice: QuestionChoice = {
      id: id,
      text: "",
    };

    setChoices((prev) => [...prev, newChoice]);
  };

  const onDeleteChoice = (id: string) => {
    setChoices((prev) => prev.filter((item) => item.id !== id));
  };

  const onChoiceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setChoices((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, text: e.target.value };
        }

        return item;
      });
    });
  };

  const handleTab = (tab: Tabs) => setTab(tab);

  const onChange = (e: any) => {
    return setFormData((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const onDropdownChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    e.preventDefault();

    return setFormData((prev) => ({
      ...prev,
      subject: item,
    }));
  };

  const onSubmit = (e: unknown) => {
    (e as FormDataEvent).preventDefault();

    const currentSub = (subjectData as SubjectData[]).find(
      (item) => item.slug === formData.subject
    );

    if (questions.length === 0) {
      toast.error("Reviewer doesn't have questions");
      return;
    }

    if (currentSub && currentSub._id && userData) {
      const mockData = {
        title: formData.title,
        subject: currentSub._id,
        desc: formData.desc ? formData.desc : "",
        count: questions.length,
        items: questions,
        isBanned: false,
        author: userData._id as string,
      };

      //   dispatch(createMock(mockData));

      mockService
        .createMock(mockData as MockData, data as string)
        .then((response: MockData) => {
          toast.success(`Succesfully created mock ${response.title}`);
          navigate("/mocks");
        })
        .catch((err: unknown) => toast.error((err as Error).message));
    }
  };

  const resetQuestionForm = () => {
    setQuestion("");
    setChoices([
      {
        id: generateRandomId(),
        text: "",
      },
    ]);
    setCorrect("");
  };

  const onAddQuestion = () => {
    if (question === "") {
      return toast.error("Please fill in a question");
    }

    if (choices[0].text === "" || choices.length === 1) {
      return toast.error("Please fill in atleast two options");
    }

    if (correct === "") {
      return toast.error("Please select a correct option");
    }

    if (!choices.every((item) => item.text !== "")) {
      return toast.error("Please fill in all fields of choices");
    }

    resetQuestionForm();

    const newQuestion: QuestionBody = {
      id: correct,
      question: question,
      choices: choices,
      correct: correct,
    };

    toast.success("Added new question");

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const onDeleteQuestion = (id: number | string) => {
    toast.success("Removed question");

    setQuestions((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <CreateCallbacksContext.Provider
      value={{
        details: {
          onSubmit: onSubmit,
          onChange: onChange,
          onDropdownChange: onDropdownChange,
        },
        questions: {
          onChoiceChange: onChoiceChange,
          onTextAreaChange: onQuestionChange,
          onCorrectChange: onCorrectChange,
          onAddChoice: onAddChoice,
          onDeleteChoice: onDeleteChoice,
          onAddQuestion: onAddQuestion,
          onDeleteQuestion: onDeleteQuestion,
        },
      }}
    >
      <Navbar />
      <div className="flex max-h-full flex-col overflow-y-auto px-4 py-20 lg:mt-8 lg:px-64 xl:mt-0 xl:w-full xl:flex-1 xl:px-96 xl:pt-12">
        <div className="">
          <h1 className={`font-inter text-3xl font-bold text-red-500`}>
            Create Reviewer
          </h1>
          <p className={`mt-2 text-gray-500 font-sans`}>
            Create a reviewer for yourself or for others
          </p>
        </div>
        <div className=" flex w-full justify-end lg:justify-center xl:justify-end">
          <MockCreateTabs handleTab={handleTab} tab={tab} />
        </div>
        {tab === "details" && (
          <MockCreateDetails
            titleVal={formData.title}
            descVal={formData.desc}
            dropdownCurrent={
              subjectData?.find((item) => item.slug === formData.subject)
                ?.name || ""
            }
            dropdownItems={subjectData as SubjectData[]}
          />
        )}
        {tab === "questions" && (
          <MockCreateQues
            questions={questions}
            choices={choices}
            question={question}
          />
        )}
      </div>
    </CreateCallbacksContext.Provider>
  );
}

export default MockCreate;
