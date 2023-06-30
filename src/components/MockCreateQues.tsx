import { useContext } from "react";
import { CreateCallbacksContext } from "../pages/MockCreate";
import {
  CreateCallbacksInterface,
  QuestionBody,
  QuestionChoice,
} from "../types";
import MockCreateQuesEdit from "./MockCreateQuesEdit";
import QuestionBox from "./QuestionBox";

interface MockCreateQuesProps {
  questions: QuestionBody[];
  choices: QuestionChoice[];
  question: string;
}

function MockCreateQues({ choices, questions, question }: MockCreateQuesProps) {
  const callbacks = useContext<CreateCallbacksInterface>(
    CreateCallbacksContext
  );

  return (
    <div className="mt-4 flex h-full w-full flex-grow flex-col">
      <MockCreateQuesEdit question={question} choices={choices} />

      <ul className="mt-4 flex flex-col gap-4">
        {questions.map((item: QuestionBody, index: number) => (
          <QuestionBox
            onDeleteQuestion={callbacks.questions.onDeleteQuestion}
            id={item.correct}
            number={index + 1}
            question={item.question}
            choices={item.choices}
            correct={item.correct}
            key={index}
            editable
            isChecking={false}
          />
        ))}
      </ul>
    </div>
  );
}

export default MockCreateQues;
