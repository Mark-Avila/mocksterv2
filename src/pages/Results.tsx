import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { PageSpinner } from "../components";
import { MockData, ResultData } from "../types";
import { resultService } from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import QuestionBox from "../components/QuestionBox";

function Result() {
  const { data } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getResultData = async () => {
      if (searchParams.has("id")) {
        const id = searchParams.get("id") as string;

        if (data) {
          try {
            const response = await resultService.getResultById({
              result_id: id,
              token: data,
              populate: "reviewer",
            });
            setResultData(response);
          } catch (err: unknown) {
            toast.error("Failed to retrieve result data from ID");
            throw Error((err as Error).message);
          }
        }
      } else {
        navigate("/home");
      }
    };

    getResultData();
  }, []);

  useEffect(() => {
    if (resultData) {
      setIsLoading(false);
    }
  }, [resultData]);

  const handleOnExit = () => {
    navigate("/home");
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <div className="flex max-h-full min-h-full w-full flex-col overflow-y-scroll bg-blue-100 p-4 md:p-8 lg:px-56 xl:px-96">
      <header className="rounded-md bg-red-500 shadow-md shadow-gray-400 md:min-h-[150px] ">
        <h1
          className={`p-4 font-inter text-xl font-bold text-white md:text-3xl lg:text-2xl`}
        >
          {resultData &&
            `(Mock) ${
              (resultData.reviewer as MockData).title
                ? (resultData.reviewer as MockData).title
                : "..."
            }`}
        </h1>
      </header>
      <div className="my-4">
        <h1
          className={`text-center font-inter text-xl font-bold text-gray-600`}
        >
          Score:{" "}
          {resultData && (
            <span className="text-red-400">{`${resultData.score}/${resultData.total}`}</span>
          )}
        </h1>
      </div>
      <ul className="flex flex-col gap-4">
        {resultData &&
          (resultData.reviewer as MockData).items.map((item, index) => (
            <QuestionBox
              isChecking={true}
              id={item.id}
              key={item.id}
              number={index + 1}
              question={item.question}
              choices={item.choices}
              correct={
                resultData.answers.find((ans) => ans.ques_id === item.id)
                  ?.answer_id || ""
              }
              editable={false}
              result={
                resultData.answers.find((ans) => ans.ques_id === item.id)
                  ?.answer_id === item.correct
                  ? "correct"
                  : "wrong"
              }
            />
          ))}
      </ul>

      <div className="mt-8 flex h-10 w-full justify-end">
        <button
          onClick={handleOnExit}
          className={`h-14 w-24 rounded-md border-2 border-red-500 bg-red-500 font-inter shadow-md shadow-gray-400 transition ease-in-out hover:bg-red-600 md:h-16 md:w-36 md:text-xl lg:text-base xl:h-12`}
        >
          <span className="font-bold text-white">Submit</span>
        </button>
      </div>
    </div>
  );
}

export default Result;
