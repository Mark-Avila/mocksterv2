import { MockCard, Navbar, SubjectCard } from "../components";
import SectionHeader from "../components/SectionHeader";

function HomeProfileCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md grid grid-cols-2">
      <div className="bg-slate-400"></div>
      <div className="h-full flex flex-col">
        <div className="p-4">
          <p className="font-inter text-slate-600 font-bold">
            Mark Christian Avila
          </p>
          <p className="font-inter text-slate-600 text-sm">TUPM-20-2120</p>
        </div>
        <div className="mt-auto h-14 border-t-2 border-slate-300">
          <button className="h-full w-fit px-4 font-bold text-red-400">
            Visit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <SectionHeader>
          Hello there!{" "}
          <span className="text-red-500">Mark Christian Avila</span>
        </SectionHeader>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <MockCard
            showRecent
            title="Data Structures and algorithms"
            creator="Jeeve Bentic"
            subject="CS123"
            items="50"
            created="30/06/2023"
          />
          <HomeProfileCard />
        </div>
        <div className="mt-8">
          <SectionHeader>User created Mocks</SectionHeader>
          <ul className="grid grid-cols-3 grid-rows-2 gap-4 mt-4">
            <MockCard
              title="Data Structures and algorithms"
              creator="Jeeve Bentic"
              subject="CS123"
              items="50"
              created="30/06/2023"
            />
            <MockCard
              title="Data Structures and algorithms"
              creator="Jeeve Bentic"
              subject="CS123"
              items="50"
              created="30/06/2023"
            />
            <MockCard
              title="Data Structures and algorithms"
              creator="Jeeve Bentic"
              subject="CS123"
              items="50"
              created="30/06/2023"
            />
            <MockCard
              title="Data Structures and algorithms"
              creator="Jeeve Bentic"
              subject="CS123"
              items="50"
              created="30/06/2023"
            />
          </ul>
        </div>
        <div className="mt-8">
          <SectionHeader>Subjects</SectionHeader>

          <ul className="grid grid-cols-4 gap-4 mt-4">
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
            <SubjectCard
              name="Data structures and algorithms"
              desc="Subject"
              onClick={() => {
                return;
              }}
            />
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;
