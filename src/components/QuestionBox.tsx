import QuestionChoice from "./QuestionChoice";
import { QuestionBody } from "../types";
import { FaTrash } from "react-icons/fa";

interface QuestionBoxProps extends QuestionBody {
  number: number | string;
  editable?: boolean;
  result?: "correct" | "wrong";
  isChecking: boolean;
  onDeleteQuestion?: (id: string) => void;
  onChoice?: (question_id: string, answer_id: string) => void;
}

function QuestionBox({
  id,
  number,
  question,
  choices,
  correct,
  editable,
  result,
  isChecking,
  onDeleteQuestion,
  onChoice,
}: QuestionBoxProps) {
  const handleOnClick = () => {
    return onDeleteQuestion ? onDeleteQuestion(id) : null;
  };

  const isCorrect = result ? result === "correct" : "";

  return (
    <li className="rounded-md bg-white  p-6 shadow-md">
      <div className="mb-4 flex w-full justify-between">
        <h1 className={`$ font-inter text-3xl font-bold text-gray-600`}>
          {number}.{" "}
          {isChecking && (
            <span
              className={`text-xl ${
                isCorrect ? "text-green-500" : "text-red-400"
              }`}
            >
              {isCorrect ? "Correct" : "Wrong"}
            </span>
          )}
        </h1>
        {editable && (
          <div className="flex items-center gap-8">
            <button
              onClick={handleOnClick}
              className="text-red-400 hover:text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600">{question}</p>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {choices.map((item, index) => (
          <QuestionChoice
            id={item.id}
            key={8732 + index}
            text={item.text}
            ques_id={id}
            name={`q${number}-c${index}`}
            checked={item.id === correct}
            onCheck={onChoice}
          />
        ))}
      </ul>
    </li>
  );
}

export default QuestionBox;
