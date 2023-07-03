import { FaAngleRight } from "react-icons/fa";
import { DropdownItemChange } from "../types";
import { limitString } from "../utils";

interface MockCreateDropdownItemProps {
  item: string;
  desc: string;
  slug: string;
  onChange: DropdownItemChange;
}

function MockCreateDropdownItem({
  item,
  desc,
  onChange,
  slug,
}: MockCreateDropdownItemProps) {
  return (
    <li className="h-10 w-full shrink-0">
      <button
        onClick={(e) => {
          onChange(e, slug);
        }}
        className={`flex h-full w-full items-center px-8 text-left font-inter text-sm text-gray-600 transition ease-in-out hover:bg-gray-100`}
      >
        <span className="mr-3 text-lg text-gray-300">
          <FaAngleRight />
        </span>
        {item}
        <span className="ml-4 text-slate-400">{limitString(desc, 50)}</span>
      </button>
    </li>
  );
}

export default MockCreateDropdownItem;
