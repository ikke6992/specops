import SearchFilter from "./SearchFilter";
import TaskList from "./TaskList";
import Navigation from "./Navigation";

const SupervisorTaskManagement = () => {
  return (
    <main className="h-screen">
      <SearchFilter />
      <TaskList />
      <Navigation />
    </main>
  );
};

export default SupervisorTaskManagement;
