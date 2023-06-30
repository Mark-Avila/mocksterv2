import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useContext } from "react";
import { CreateCallbacksContext } from "../pages/MockCreate";

interface MockCreateInputProps {
  title: string;
  htmlName: string;
  placeholder?: string;
  value: string;
}

function MockCreateInput({
  title,
  htmlName,
  placeholder,
  value,
}: MockCreateInputProps) {
  const { details } = useContext(CreateCallbacksContext);

  return (
    <div className="mb-8 flex flex-col">
      <label className={`font-bold text-gray-600 lg:text-sm font-inter`}>
        {title}
      </label>
      <div className="mt-2 h-12 w-full overflow-hidden rounded-md shadow-md">
        <input
          value={value}
          onChange={details.onChange}
          name={htmlName}
          className={`h-full w-full px-4 text-gray-600 lg:text-sm font-sans rounded-md outline-none`}
          type="text"
          placeholder={placeholder ? placeholder : ""}
        />
      </div>
    </div>
  );
}

export default MockCreateInput;
