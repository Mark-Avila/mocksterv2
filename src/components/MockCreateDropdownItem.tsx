import { FaAngleRight } from "react-icons/fa";
import { DropdownItemChange } from "../types";

interface MockCreateDropdownItemProps {
  item: string;
  slug: string;
  onChange: DropdownItemChange;
}

function MockCreateDropdownItem({
  item,
  onChange,
  slug,
}: MockCreateDropdownItemProps) {
  return (
    <li className="h-10 w-full shrink-0">
      <button
        onClick={(e) => {
          onChange(e, slug);
        }}
        className={`font-inter flex h-full w-full items-center px-8 text-left text-sm text-gray-600 transition ease-in-out hover:bg-gray-100`}
      >
        <span className="mr-3 text-lg text-gray-300">
          <FaAngleRight />
        </span>
        {item}
      </button>
    </li>
  );
}

export default MockCreateDropdownItem;
