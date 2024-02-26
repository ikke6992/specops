import TaskList from "./TaskList";
import { useContext, useState } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import TaskBody from "../../models/task/TaskBody";
import TaskCreator from "../create-tasks/TaskCreator";
import { useNavigate } from "react-router-dom";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import NavigateButton from "../common/buttons/NavigateButton";
import OpenButton from "../common/buttons/OpenButton";
import Layout from "../common/layout/Layout";

const Content = () => {
  const { addTask, moveLeft, moveRight } = useContext(TaskContext);
  const [showCreator, setShowCreator] = useState(false);
  const navigate = useNavigate();

  const SearchBar = () => {
    return (
      <h1 className="text-3xl text-slate-950 font-black uppercase">
        Task Manager
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <>
        {/* Go to history */}
        <NavigateButton
          name="Open History"
          navigate={() => {
            navigate("/history");
          }}
        />
        {/* Browse through tasks */}
        <div className="p-2 flex flex-row justify-center items-center">
          <MoveLeftButton moveLeft={() => moveLeft()} />
          <MoveRightButton moveRight={() => moveRight()} />
        </div>
        {/* Create task */}
        <OpenButton name="Open Create Task" open={() => setShowCreator(true)} />
      </>
    );
  };

  return (
    <>
      <Layout
        searchBar={<SearchBar />}
        content={<TaskList />}
        navigation={<Navigation />}
      />
      {/* Show create task menu if needed */}
      {showCreator && (
        <TaskCreator
          submit={(task: TaskBody) => addTask(task)}
          close={() => setShowCreator(false)}
        />
      )}
    </>
  );
};

const SupervisorTaskManagement = () => {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
};

export default SupervisorTaskManagement;