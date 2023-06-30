interface Props {
  children: React.ReactNode;
}

function SectionHeader({ children }: Props) {
  return (
    <h1 className="text-2xl font-inter text-slate-600 font-bold">{children}</h1>
  );
}

export default SectionHeader;
