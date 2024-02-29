import TaskList from "./TaskList";
import { useContext, useState } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import TaskBody from "../../models/task/TaskBody";
import TaskCreator from "../create-tasks/TaskCreator";
import { useNavigate } from "react-router-dom";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import NavigateButton from "../common/buttons/NavigateButton";
import FunctionButton from "../common/buttons/FunctionButton";
import Layout from "../common/layout/Layout";

const Content = () => {
  const { addTask, moveLeft, moveRight, search, filter } =
    useContext(TaskContext);
  const [showCreator, setShowCreator] = useState(false);
  const navigate = useNavigate();

  const SearchBar = () => {
    return (
      <h1 className="text-3xl text-slate-950 font-black uppercase">
        Task Dashboard
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <>
        {/* Go to list mode */}
        <NavigateButton
          name="Open list"
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
        <FunctionButton
          name="Open Create Task"
          method={() => setShowCreator(true)}
        />
      </>
    );
  };

  return (
    <>
      <Layout
        search={search}
        searchBar={<SearchBar />}
        content={<TaskList />}
        navigation={<Navigation />}
        filter={filter}
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

const TaskManager = () => {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
};

export default TaskManager;
