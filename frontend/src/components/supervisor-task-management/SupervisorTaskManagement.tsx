import Card1 from "../common/cards/card1/Card1";

const SupervisorTaskManagement = () => {
  return (
    <main className="h-screen">
      {/* Search & Filter Section */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        <h1 className="text-3xl text-slate-950 font-black uppercase">
          Task Manager
        </h1>
      </section>
      {/* Task List Section */}
      <section
        className="p-8 bg-gray-400 grid grid-cols-4 grid-rows-2 gap-5"
        style={{ height: "70%" }}
      >
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
      </section>
      {/* Navigation + Create Section */}
      <section
        className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
        style={{ height: "10%" }}
      >
        <div></div>
        <div className="p-2 flex flex-row justify-center items-center">
          <button className="p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white">
            ←
          </button>
          <button className="ml-4 p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white">
            →
          </button>
        </div>
        <button className="bg-green-600 hover:bg-green-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white">
          Create Task
        </button>
      </section>
    </main>
  );
};

export default SupervisorTaskManagement;
