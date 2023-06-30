import { Tabs } from "../types";

interface MockCreateTabsProps {
  handleTab: (tab: Tabs) => void;
  tab: Tabs;
}

function MockCreateTabs({ handleTab, tab }: MockCreateTabsProps) {
  return (
    <div className="mt-4 flex h-12 w-full overflow-hidden rounded-lg shadow-md lg:w-full xl:h-10 xl:w-64">
      <MockCreateTab
        onClick={() => handleTab("details")}
        text="Details"
        active={tab === "details"}
      />
      <MockCreateTab
        onClick={() => handleTab("questions")}
        text="Questions"
        active={tab === "questions"}
      />
    </div>
  );
}

interface MockCreateTabProps {
  active?: boolean;
  text: string;
  onClick: () => void;
}

function MockCreateTab({ active, text, onClick }: MockCreateTabProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full ${
        active ? "bg-red-500 font-bold" : "bg-white text-gray-500"
      } font-inter text-base lg:text-sm text-white`}
    >
      {text}
    </button>
  );
}

export default MockCreateTabs;
