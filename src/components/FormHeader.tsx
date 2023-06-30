import { useContext } from "react";
import { ToggleFormContext } from "../pages/Landing";

interface Props {
  main: string;
  follow: string;
  linkText: string;
  linkMain: string;
}

function FormHeader({ main, follow, linkText, linkMain }: Props) {
  const { toggleForm } = useContext(ToggleFormContext);

  return (
    <>
      <h1 className="font-inter text-slate-500 font-bold text-3xl">
        <span className="text-red-500">{main}</span>
        <br />
        {follow}
      </h1>
      <p className="text-slate-500 text-sm font-inter mt-8">
        {linkText}
        <button onClick={toggleForm} className="text-red-500 font-bold">
          {" "}
          {linkMain}
        </button>
      </p>
    </>
  );
}

export default FormHeader;
