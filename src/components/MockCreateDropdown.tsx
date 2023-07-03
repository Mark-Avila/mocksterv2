import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import MockCreateDropdownItem from "./MockCreateDropdownItem";
import { useState, useContext } from "react";
import { CreateCallbacksContext } from "../pages/MockCreate";
import { DropdownItemChange, SubjectData } from "../types";

interface MockCreateDropdownProps {
  title: string;
  current: string;
  items: SubjectData[];
}

function MockCreateDropdown({
  title,
  items,
  current,
}: MockCreateDropdownProps) {
  const [active, setActive] = useState(false);
  const { details } = useContext(CreateCallbacksContext);

  const toggleDropdown = (e: any) => {
    e.preventDefault();
    setActive(!active);
  };

  const handleOnChange: DropdownItemChange = (e, item) => {
    details.onDropdownChange(e, item);
    toggleDropdown(e);
  };

  return (
    <div className="mb-8 flex flex-col">
      <h1 className={`font-inter font-bold text-gray-600 lg:text-sm`}>
        {title}
      </h1>
      <div className="relative">
        <div className="mt-2 flex h-12 w-full items-center overflow-hidden rounded-md bg-white shadow-md">
          <p className="w-full flex-1 px-4  text-gray-600 lg:text-sm">
            {current !== "" ? (
              current
            ) : (
              <span className={`font-sans text-gray-400`}>
                Please select the relevant subject for your reviewer
              </span>
            )}
          </p>
          <button
            onClick={toggleDropdown}
            className="flex h-full w-12 items-center justify-center border-l-2 border-l-gray-300 text-xl text-gray-500"
          >
            <FaAngleDown />
          </button>
        </div>
        {active && (
          <ul className="absolute mt-1 flex h-fit max-h-60 w-full flex-col overflow-y-auto rounded-lg bg-white py-2 shadow-lg">
            {items.length !== 0 &&
              items.map((item) => (
                <MockCreateDropdownItem
                  key={item._id}
                  item={item.name}
                  desc={item.desc}
                  slug={item.slug}
                  onChange={handleOnChange}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MockCreateDropdown;
