interface Props {
  current: number;
  max: number;
}

function AnswerProgress({ current, max }: Props) {
  return (
    <div className="relative my-4 h-10 w-full rounded-full border-4 border-red-500">
      <div className="absolute z-20 flex h-full w-full items-center justify-center">
        <p className={`font-inter font-bold text-red-500`}>
          {`${current}/${max}`}
        </p>
      </div>
      <div
        style={{
          width: `${(current / max) * 100}%`,
        }}
        className="absolute left-0 top-0 z-10 h-full rounded-full bg-teal-300"
      ></div>
    </div>
  );
}

export default AnswerProgress;
