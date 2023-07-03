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
          className="h-full w-full resize-none rounded-md p-4 text-sm text-gray-600 lg:text-sm"
          placeholder="Enter question here"
        />
      </div>
      <div className="flex h-fit w-full flex-col gap-2">
        {choices.map((item) => (
          <div key={16237 + item.id} className="flex h-8 w-full">
            <input
              type="radio"
              name="mock-q-1"
              className="mx-2 w-6 text-sm"
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
                className={`h-full w-full rounded-md bg-transparent font-inter text-xs text-gray-500 outline-none focus:text-gray-800 lg:text-xs`}
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
      <div className="flex md:justify-end">
        <button
          onClick={questions.onAddChoice}
          className={`h-10 w-full rounded-md bg-red-400 font-inter text-xs text-white transition ease-in-out hover:bg-red-300 md:w-24 lg:h-12 lg:w-24 lg:text-xs`}
        >
          Add choice
        </button>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <button
          onClick={questions.onAddQuestion}
          className={`flex-0 h-12 w-40 rounded-md bg-white font-inter text-xs font-bold text-red-500 hover:bg-gray-100 lg:w-36 lg:text-sm xl:h-10 xl:text-xs`}
        >
          Add question
        </button>
      </div>
    </div>
  );
}

export default MockCreateQuesEdit;
