import { limitString } from "../utils";

interface MockGridItemProps {
  label: string;
  value: string;
}

function MockGridItem({ label, value }: MockGridItemProps) {
  return (
    <p className="mb-2 font-sans text-sm text-slate-500">
      <span className="font-bold">{label}</span> {value}
    </p>
  );
}

interface Props {
  showRecent?: boolean;
  title: string;
  creator: string;
  created: string;
  items: string;
  subject: string;
  onStart: (e: unknown) => void;
}

function MockCard({
  showRecent,
  title,
  creator,
  created,
  items,
  subject,
  onStart,
}: Props) {
  return (
    <li className="min-w-max list-none rounded-lg border-l-4 border-red-400 bg-white shadow-md">
      <div className="p-4">
        {showRecent && (
          <p className="font-sans text-sm font-bold text-slate-400">
            Based on your recent activities
          </p>
        )}
        <h1 className="my-2 font-inter font-bold text-red-400">{title}</h1>
        <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-y-2">
          <MockGridItem label="Creator" value={limitString(creator, 15)} />
          <MockGridItem label="Date Created" value={created} />
          <MockGridItem label="Subject" value={subject} />
          <MockGridItem label="Items" value={items} />
        </div>
      </div>
      <div className="border-t-2 border-slate-300">
        <button
          onClick={onStart}
          className="m-4 font-inter font-bold text-red-400 transition ease-in-out hover:text-cyan-400"
        >
          Start
        </button>
      </div>
    </li>
  );
}

export default MockCard;
