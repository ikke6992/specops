import TaskList from "./TaskList";
import { useContext } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import Layout from "../common/layout/Layout";

const Content = () => {
  const { search, filter } = useContext(TaskContext);

  return (
    <>
      <Layout
        search={search}
        header="Task Dashboard"
        content={<TaskList />}
        filter={filter}
        isHistory={false}
        isDashboard={true}
      />
    </>
  );
};

const TaskManager = () => {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
};

export default TaskManager;
