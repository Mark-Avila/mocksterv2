import { useContext } from "react";
import { CreateCallbacksContext } from "../pages/MockCreate";
import MockCreateInput from "./MockCreateInput";
import { SubjectData } from "../types";
import MockCreateDropdown from "./MockCreateDropdown";

interface MockCreateDetailsProps {
  dropdownCurrent: string;
  dropdownItems: SubjectData[];
  titleVal: string;
  descVal: string;
}

function MockCreateDetails(props: MockCreateDetailsProps) {
  const { dropdownCurrent, dropdownItems, titleVal, descVal } = props;

  const { details } = useContext(CreateCallbacksContext);

  return (
    <form onSubmit={details.onSubmit} className="mt-8 flex flex-col ">
      <MockCreateInput
        value={titleVal}
        title="Title"
        htmlName="title"
        placeholder="Enter title for your mock or reviewer"
      />
      <MockCreateDropdown
        title="Subject"
        items={dropdownItems}
        current={dropdownCurrent}
      />
      <MockCreateInput
        value={descVal}
        title="Description"
        htmlName="desc"
        placeholder="Enter your mock or reviewer description"
      />
      <div className="h-12 w-full xl:flex xl:justify-end">
        <button
          type="submit"
          className={`first-letter h-full w-full rounded-md bg-red-500 font-inter font-bold text-white shadow-md xl:w-1/4 xl:text-sm`}
        >
          Create reviewer
        </button>
      </div>
    </form>
  );
}

export default MockCreateDetails;
