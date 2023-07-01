import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MockData, QuestionAnswers, ResultData } from "../types";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RootState } from "../main";
import { PageSpinner } from "../components";
import AnswerProgress from "../components/AnswerProgress";
import QuestionBox from "../components/QuestionBox";
import { mockService, resultService } from "../services";

function MockAnswer() {
  const [answers, setAnswers] = useState<QuestionAnswers[]>(
    [] as QuestionAnswers[]
  );
  const { data } = useSelector((state: RootState) => state.auth);
  const [mockData, setMockData] = useState<MockData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getMockData = async () => {
      if (searchParams.has("id") && data) {
        try {
          const response = await mockService.getMockById(
            data,
            searchParams.get("id") as string
          );
          setMockData(response);
        } catch (err: unknown) {
          const message = (err as Error).message;
          toast.error("Failed to retrieve mock data");
          navigate("/mocks");
          throw Error(message);
        }
      } else {
        navigate("/mocks");
      }
    };

    getMockData();
  }, []);

  const onCheck = (ques_id: string, answer_id: string) => {
    const alreadyChecked = answers.some((item) => item.ques_id === ques_id);

    if (alreadyChecked) {
      return setAnswers((prev) => {
        return prev.map((item) => {
          if (item.ques_id === ques_id) {
            return { ...item, answer_id: answer_id };
          }

          return item;
        });
      });
    }

    const newAnswer: QuestionAnswers = {
      ques_id: ques_id,
      answer_id: answer_id,
    };

    return setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleOnExit = (e: any) => {
    e.preventDefault();
    navigate("/mocks");
  };

  const handleOnSubmit = async (e: unknown) => {
    (e as FormDataEvent).preventDefault();

    setIsLoading(true);

    if (mockData !== null) {
      const items = mockData.items;

      let correct = 0;

      items.forEach((item) => {
        const chosenAnswer = answers.find((answer) => {
          return answer.ques_id === item.id;
        });

        if (chosenAnswer && item.correct === chosenAnswer.answer_id) {
          correct++;
        }
      });

      const mockId = mockData._id;

      if (mockId) {
        const newResult: ResultData = {
          reviewer: mockId,
          score: correct,
          total: mockData.items.length,
          answers: answers,
        };

        if (data) {
          try {
            const response: ResultData = await resultService.createResult(
              newResult,
              data
            );
            toast.success("Successfully submitted mock test");
            navigate({
              pathname: "/mocks/results",
              search: createSearchParams({
                id: response._id as string,
              }).toString(),
            });
          } catch (err: unknown) {
            toast.error((err as Error).message);
            throw Error((err as Error).message);
          }
        }
      }
    }
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex max-h-full min-h-full w-full flex-col overflow-y-scroll bg-blue-100 p-4 md:p-8 lg:px-56 xl:px-96"
    >
      <header className="rounded-md bg-red-500 shadow-md shadow-gray-400 md:min-h-[150px]">
        <h1
          className={`p-4 font-inter text-xl font-bold md:text-3xl lg:text-2xl`}
        >
          {`(Mock) ${mockData ? mockData.title : "..."}`}
        </h1>
      </header>
      <div>
        {!isLoading && mockData && (
          <AnswerProgress max={mockData.count} current={answers.length} />
        )}
      </div>
      <ul className="flex flex-col gap-4">
        {mockData &&
          mockData.items.map((item, index) => (
            <QuestionBox
              id={item.id}
              key={item.id}
              number={index + 1}
              question={item.question}
              choices={item.choices}
              correct={
                answers.find((ans) => ans.ques_id === item.id)?.answer_id || ""
              }
              onChoice={onCheck}
              isChecking={false}
            />
          ))}
      </ul>
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleOnExit}
          className={`h-14 w-24 rounded-md border-2 border-red-500 bg-white font-inter font-bold text-red-400 shadow-md shadow-gray-300 transition ease-in-out hover:bg-red-500  hover:text-white md:h-16 md:w-36 md:text-xl lg:text-base xl:h-12`}
        >
          Exit
        </button>
        <button
          onClick={handleOnSubmit}
          className={`h-14 w-24 rounded-md border-2 border-red-500 bg-red-500 font-inter shadow-md shadow-gray-300 transition ease-in-out hover:bg-red-600 md:h-16 md:w-36 md:text-xl lg:text-base xl:h-12`}
        >
          <span className="font-bold text-white">Submit</span>
        </button>
      </div>
    </form>
  );
}

export default MockAnswer;
