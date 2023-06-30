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
import { userService } from "../services";

export const CreateCallbacksContext =
  createContext<CreateCallbacksInterface | null>(null);

function MockCreate() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subjectData, setSubjectData] = useState<SubjectData[] | null>(null);

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

  // const subjectItems = [
  //   "Artificial Intelligence",
  //   "Software Engineering",
  //   "Data modelling and simulation",
  // ];

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const currentSub = (subjectData as SubjectData[]).find(
      (item) => item.slug === formData.subject
    );

    console.log(questions.length);

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

  return <p></p>;
}

export default MockCreate;
