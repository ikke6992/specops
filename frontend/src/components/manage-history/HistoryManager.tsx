import { HistoryContext, HistoryProvider } from "../../contexts/HistoryContext";
import { useContext, useState } from "react";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import Content from "./Content";

// Task View, Task Manager, History Manager
const TaskContent = (props: { toggleMode: () => void }) => {
  const { getLogs, setSize, moveRight, moveLeft, filter, search } =
    useContext(TaskContext);
  return (
    <Content
      toggleMode={props.toggleMode}
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

const HistoryContent = (props: { toggleMode: () => void }) => {
  const { getLogs, setSize, moveRight, moveLeft, filter, search } =
    useContext(HistoryContext);
  return (
    <Content
      toggleMode={props.toggleMode}
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
  const [historyMode, setHistoryMode] = useState(true);

  const toggleMode = () => {
    setHistoryMode(!historyMode);
  };

  return (
    <>
      {historyMode ? (
        <HistoryProvider>
          <HistoryContent toggleMode={toggleMode} />
        </HistoryProvider>
      ) : (
        <TaskProvider>
          <TaskContent toggleMode={toggleMode} />
        </TaskProvider>
      )}
    </>
  );
};

export default HistoryManager;
