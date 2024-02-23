import Modal from "./components/common/modal/Modal";
import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement";
import { TaskProvider } from "./data/contexts/TaskContext";

const App = () => {
  return (
    <>
      <TaskProvider>
        <SupervisorTaskManagement />
      </TaskProvider>
    </>
  );
};

export default App;
