interface QuestionChoiceProps {
  text: string;
  checked: boolean;
  name: string;
  id: string;
  ques_id: string;
  onCheck?: (question_id: string, answer_id: string) => void;
}

function QuestionChoice({
  text,
  id,
  checked,
  name,
  ques_id,
  onCheck,
}: QuestionChoiceProps) {
  const handleOnCheck = () => {
    if (onCheck) {
      onCheck(ques_id, id);
    }
  };

  return (
    <li className="flex items-center">
      <input
        id={name}
        name={name}
        type="radio"
        className="mr-4 w-6"
        onChange={handleOnCheck}
        checked={checked}
      />
      <label
        htmlFor="mock-q1-c1"
        className={`font-inter text-gray-500 lg:text-sm ${
          checked ? "font-bold text-gray-700" : ""
        }`}
      >
        {text}
      </label>
    </li>
  );
}

export default QuestionChoice;
