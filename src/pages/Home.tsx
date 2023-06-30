import { MockCard, Navbar } from "../components";

function Home() {
  return (
    <>
      <Navbar />
      <main className="px-4 xl:px-48 xl:py-16">
        <h1 className="text-2xl font-inter text-slate-600 font-bold">
          Hello there!{" "}
          <span className="text-red-500">Mark Christian Avila</span>
        </h1>
        <div className="grid lg:grid-cols-2 gap-4 mt-8">
          <MockCard />
          <div className="bg-white rounded-lg overflow-hidden shadow-md grid grid-cols-2">
            <div className="bg-slate-400"></div>
            <div className="h-full flex flex-col">
              <div className="p-4">
                <p className="font-inter text-slate-600 font-bold">
                  Mark Christian Avila
                </p>
                <p className="font-inter text-slate-600 text-sm">
                  TUPM-20-2120
                </p>
              </div>
              <div className="mt-auto h-14 border-t-2 border-slate-300">
                <button className="h-full w-fit px-4 font-bold text-red-400">
                  Visit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
