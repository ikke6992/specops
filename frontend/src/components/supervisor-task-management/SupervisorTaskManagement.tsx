import Card1 from "../common/cards/card1/Card1";

const SupervisorTaskManagement = () => {
  return (
    <main className="h-screen">
      {/* Search & Filter Section */}
      <section className="bg-slate-500 h-1/5"></section>
      {/* Task List Section */}
      <section className="bg-gray-400 h-4/5">
        <Card1 />
      </section>
    </main>
  );
};

export default SupervisorTaskManagement;
