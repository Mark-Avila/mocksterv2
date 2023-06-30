interface MockGridItemProps {
  label: string;
  value: string;
}

function MockGridItem({ label, value }: MockGridItemProps) {
  return (
    <p className="font-sans text-slate-500 mb-2 text-sm">
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
}

function MockCard({
  showRecent,
  title,
  creator,
  created,
  items,
  subject,
}: Props) {
  return (
    <li className="list-none min-w-max bg-white rounded-lg shadow-md border-l-4 border-red-400">
      <div className="p-4">
        {showRecent && (
          <p className="text-slate-400 font-sans text-sm font-bold">
            Based on your recent activities
          </p>
        )}
        <h1 className="my-2 text-red-400 font-bold font-inter">{title}</h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-2 mt-4">
          <MockGridItem label="Creator" value={creator} />
          <MockGridItem label="Date Created" value={created} />
          <MockGridItem label="Subject" value={subject} />
          <MockGridItem label="Items" value={items} />
        </div>
      </div>
      <div className="border-t-2 border-slate-300">
        <button className="m-4 font-inter text-red-400 transition ease-in-out hover:text-cyan-400 font-bold">
          Start
        </button>
      </div>
    </li>
  );
}

export default MockCard;
