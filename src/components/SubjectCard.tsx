interface Props {
  name: string;
  desc: string;
  route?: string;
  onClick: (e: unknown) => void;
}

function SubjectCard({ name, desc, onClick }: Props) {
  return (
    <li className="h-fit overflow-hidden rounded-md border-l-4 border-red-400 shadow-lg">
      <button
        onClick={onClick}
        className="h-full w-full bg-white p-4 text-left hover:bg-slate-100"
      >
        <p className={`font-inter text-sm font-bold text-slate-500`}>{name}</p>
        <p className={`mt-2 font-inter text-xs text-slate-500`}>{desc}</p>
      </button>
    </li>
  );
}

export default SubjectCard;
