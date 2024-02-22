import Modal from "./components/common/Modal";
import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement";

const App = () => {
  return (
    <>
      <Modal name="Add Task" />
      <SupervisorTaskManagement />
    </>
  );
};

export default App;
