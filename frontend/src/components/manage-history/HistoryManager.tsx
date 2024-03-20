import { HistoryContext, HistoryProvider } from "../../contexts/HistoryContext";
import { useContext } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import Content from "./Content";
import { useParams } from "react-router-dom";

// Task View, Task Manager, History Manager
const TaskContent = () => {
  const { getLogs, setSize, moveRight, moveLeft, filter, search } =
    useContext(TaskContext);
  return (
    <Content
      mode="history"
      getLogs={getLogs}
      setSize={setSize}
      moveRight={moveRight}
      moveLeft={moveLeft}
      filter={filter}
      search={search}
    />
  );
};

const HistoryContent = () => {
  const { getLogs, setSize, moveRight, moveLeft, filter, search } =
    useContext(HistoryContext);
  return (
    <Content
      mode="tasks"
      getLogs={getLogs}
      setSize={setSize}
      moveRight={moveRight}
      moveLeft={moveLeft}
      filter={filter}
      search={search}
    />
  );
};

const HistoryManager = () => {
  const { type } = useParams();

  return (
    <>
      {type === "old" ? (
        <HistoryProvider>
          <HistoryContent />
        </HistoryProvider>
      ) : (
        <TaskProvider>
          <TaskContent />
        </TaskProvider>
      )}
    </>
  );
};

export default HistoryManager;
