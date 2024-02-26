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

const Content = () => {
  const { addTask, moveLeft, moveRight } = useContext(TaskContext);
  const [showCreator, setShowCreator] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="h-screen">
      {/* Search & Filter */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        <h1 className="text-3xl text-slate-950 font-black uppercase">
          Task Manager
        </h1>
      </section>
      {/* Task List */}
      <section
        className="p-8 bg-gray-400"
        style={{
          height: "70%",
        }}
      >
        <TaskList />
      </section>
      {/* Navigation */}
      <section
        className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
        style={{ height: "10%" }}
      >
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
      </section>
      {/* Show create task menu if needed */}
      {showCreator && (
        <TaskCreator
          submit={(task: TaskBody) => addTask(task)}
          close={() => setShowCreator(false)}
        />
      )}
    </main>
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
