import { Navbar } from "../components";
import SectionHeader from "../components/SectionHeader";

function Subjects() {
  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <SectionHeader>
          Browse <span className="text-red-400">subjects</span>
        </SectionHeader>
      </main>
    </>
  );
}

export default Subjects;
