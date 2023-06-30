import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { CreateCallbacksContext } from "../pages/MockCreate";
import { QuestionChoice } from "../types";

interface MockCreateQuesEditProps {
  choices: QuestionChoice[];
  question: string;
}

function MockCreateQuesEdit({ choices, question }: MockCreateQuesEditProps) {
  const { questions } = useContext(CreateCallbacksContext);

  return (
    <div className="flex flex-col gap-2 rounded-md bg-red-500 p-4 shadow-md">
      <div className="h-28 w-full">
        <textarea
          value={question}
          onChange={questions.onTextAreaChange}
          className="h-full w-full resize-none rounded-md p-4 text-gray-600 lg:text-sm"
          placeholder="Enter question here"
        />
      </div>
      <div className="flex h-fit w-full flex-col gap-2">
        {choices.map((item) => (
          <div key={16237 + item.id} className="flex h-8 w-full">
            <input
              type="radio"
              name="mock-q-1"
              className="mx-2 w-6"
              onChange={() => {
                questions.onCorrectChange(item.id);
              }}
            />
            <div className="flex w-full rounded-md bg-white px-4">
              <input
                onChange={(e) => {
                  questions.onChoiceChange(e, item.id);
                }}
                value={item.text}
                type="text"
                placeholder="Enter question choice here"
                className={`font-inter h-full w-full rounded-md bg-transparent text-gray-500 outline-none focus:text-gray-800 lg:text-xs`}
              />
              <button
                onClick={() => {
                  questions.onDeleteChoice(item.id);
                }}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex lg:justify-end">
        <button
          onClick={questions.onAddChoice}
          className={`h-12 w-full text-white rounded-md bg-red-400 lg:h-8 lg:w-24 lg:text-xs font-inter`}
        >
          Add choice
        </button>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <button
          onClick={questions.onAddQuestion}
          className={`flex-0 h-12 w-1/2 rounded-md bg-white text-red-500 font-inter font-bold hover:bg-gray-100 lg:w-36 lg:text-sm xl:h-10 xl:text-xs`}
        >
          Add question
        </button>
      </div>
    </div>
  );
}

export default MockCreateQuesEdit;
