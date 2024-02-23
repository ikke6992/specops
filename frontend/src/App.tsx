import Modal from "./components/common/modal/Modal";
import SupervisorTaskManagement from "./components/manage-tasks/TaskManager";
import { TaskProvider } from "./contexts/TaskContext";

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
