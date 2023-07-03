interface Props {
  title: string;
  htmlName: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ title, htmlName, placeholder, value, onChange }: Props) {
  return (
    <div className="mb-8 flex flex-col">
      <label className={`font-inter font-bold text-gray-600 lg:text-sm`}>
        {title}
      </label>
      <div className="mt-2 h-12 w-full overflow-hidden rounded-md shadow-md">
        <input
          value={value}
          onChange={onChange}
          name={htmlName}
          className={`h-full w-full rounded-md px-4 font-sans text-gray-600 outline-none lg:text-sm`}
          type="text"
          placeholder={placeholder ? placeholder : ""}
        />
      </div>
    </div>
  );
}

export default TextInput;
