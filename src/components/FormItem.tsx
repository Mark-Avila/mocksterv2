interface Props {
  children: React.ReactNode;
  twoCols?: boolean;
}

function FormItem({ children, twoCols }: Props) {
  return (
    <div
      className={`w-full h-fit mb-4 ${twoCols ? "grid grid-cols-2 gap-4" : ""}`}
    >
      {children}
    </div>
  );
}

export default FormItem;
