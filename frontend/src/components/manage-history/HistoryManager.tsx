import { useNavigate } from "react-router-dom";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import NavigateButton from "../common/buttons/NavigateButton";
import Layout from "../common/layout/Layout";
import Log from "../common/log/Log";
import { HistoryContext, HistoryProvider } from "../../contexts/HistoryContext";
import { useContext, useEffect, useState } from "react";
import useWindowDimensions from "../../utils/windowdimensions";
import size from "../../utils/loglistsize";
import { TaskContext, TaskProvider } from "../../contexts/TaskContext";
import FunctionButton from "../common/buttons/FunctionButton";
import HistoryLog from "../../models/log/HistoryLog";
import TaskLog from "../../models/log/TaskLog";

// Task View, Task Manager, History Manager
type PropsType = {
  toggleMode: () => void;
  mode: "task" | "history";
  getLogs: () => HistoryLog[] | TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
};

const TaskContent = (props: { toggleMode: () => void }) => {
  const { getLogs, setSize, moveRight, moveLeft } = useContext(TaskContext);
  return (
    <Content
      toggleMode={props.toggleMode}
      mode="history"
      getLogs={getLogs}
      setSize={setSize}
      moveRight={moveRight}
      moveLeft={moveLeft}
    />
  );
};

const HistoryContent = (props: { toggleMode: () => void }) => {
  const { getLogs, setSize, moveRight, moveLeft } = useContext(HistoryContext);
  return (
    <Content
      toggleMode={props.toggleMode}
      mode="task"
      getLogs={getLogs}
      setSize={setSize}
      moveRight={moveRight}
      moveLeft={moveLeft}
    />
  );
};

const Content = ({
  toggleMode,
  mode,
  getLogs,
  setSize,
  moveRight,
  moveLeft,
}: PropsType) => {
  const { height } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    const updateSize = () => {
      const newSize = size(height);
      setSize(newSize);
    };
    updateSize();
  }, [height, setSize]);

  const SearchBar = () => {
    return (
      <h1 className="text-3xl text-slate-950 font-black uppercase">
        {mode === "task" ? "Task List" : "History List"}
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <>
        {/* Go to history */}
        <NavigateButton
          name="Open Task Manager"
          navigate={() => {
            navigate("/tasks");
          }}
        />
        {/* Browse through tasks */}
        <div className="p-2 flex flex-row justify-center items-center">
          <MoveLeftButton moveLeft={() => moveLeft()} />
          <MoveRightButton moveRight={() => moveRight()} />
        </div>
        <FunctionButton
          method={() => toggleMode()}
          name={`Toggle ${mode} mode`}
        />
      </>
    );
  };

  return (
    <>
      <Layout
        searchBar={<SearchBar />}
        content={<Log logs={getLogs()} />}
        navigation={<Navigation />}
      />
    </>
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
