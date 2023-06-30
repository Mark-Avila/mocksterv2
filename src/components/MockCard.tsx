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

function MockCard() {
  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-red-400">
      <div className="p-4">
        <p className="text-slate-400 font-sans text-sm font-bold">
          Based on your recent activities
        </p>
        <h1 className="my-2 text-red-400 font-bold font-inter text-lg">
          Data Structures and Algorithms
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-2 mt-4">
          <MockGridItem label="Creator" value="Jeeve Bentic" />
          <MockGridItem label="Date Created" value="30/06/2023" />
          <MockGridItem label="Subject" value="CS321" />
          <MockGridItem label="Items" value="50" />
        </div>
      </div>
      <div className="border-t-2 border-slate-300">
        <button className="m-4 font-inter text-red-400 transition ease-in-out hover:text-cyan-400 font-bold">
          Start
        </button>
      </div>
    </div>
  );
}

export default MockCard;
