import SearchFilter from "./filter/Filter";
import TaskList from "./list/TaskList";
import { useContext, useState } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import TaskBody from "../../models/task/TaskBody";
import CreateTaskButton from "./create/CreateTaskButton";
import MoveLeft from "./navigate/MoveLeft";
import MoveRight from "./navigate/MoveRight";
import TaskCreator from "../create-tasks/TaskCreator";

const Content = () => {
  const { addTask } = useContext(TaskContext);
  const [showCreator, setShowCreator] = useState(false);

  return (
    <main className="h-screen">
      {/* Search & Filter */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        <SearchFilter />
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
        <div></div>
        {/* Browse through tasks */}
        <div className="p-2 flex flex-row justify-center items-center">
          <MoveLeft />
          <MoveRight />
        </div>
        {/* Create task */}
        <CreateTaskButton onClick={() => setShowCreator(true)} />
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

const TaskManager = () => {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
};

export default TaskManager;
