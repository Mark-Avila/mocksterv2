interface Props {
  placeholder?: string;
  name: string;
  type: "text" | "password" | "email";
  max?: number;
  onChange: (e: unknown) => void;
  value: string;
  disabled?: boolean;
}

function FormInput({
  placeholder,
  onChange,
  name,
  type,
  max,
  value,
  disabled,
}: Props) {
  return (
    <div
      className={`w-full h-12 bg-white shadow-md border-l-4 border-l-red-500`}
    >
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`font-inter xl:text-xs outline-none bg-transparent ${
          disabled ? "text-gray-400" : "text-gray-800"
        } w-full h-full px-4`}
        maxLength={max ? max : 50}
        onChange={onChange}
        value={value}
        required
        disabled={disabled}
      />
    </div>
  );
}

export default FormInput;
