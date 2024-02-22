import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement";
import { TaskListProvider } from "./data/contexts/TaskListContext";

const App = () => {
  return (
    <>
      <TaskListProvider>
        <SupervisorTaskManagement />
      </TaskListProvider>
    </>
  );
};

export default App;
