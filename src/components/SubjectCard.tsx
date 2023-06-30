interface Props {
  name: string;
  desc: string;
  route?: string;
  onClick: (e: any) => void;
}

function SubjectCard({ name, desc, onClick }: Props) {
  return (
    <li className="h-fit rounded-md border-l-4 border-red-400 bg-white shadow-lg">
      <button onClick={onClick} className="h-full w-full p-4 text-left">
        <p className={`font-inter text-sm font-bold text-gray-600`}>{name}</p>
        <p className={`font-inter mt-2 text-xs text-gray-500`}>{desc}</p>
      </button>
    </li>
  );
}

export default SubjectCard;
