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
import { TaskProvider } from "../../contexts/TaskContext";
import FunctionButton from "../common/buttons/FunctionButton";

// Task View, Task Manager, History Manager
type PropsType = {
  toggleMode: () => void;
  mode: string;
};
const Content = ({ toggleMode, mode }: PropsType) => {
  const { getRecords, setSize, moveRight, moveLeft } =
    useContext(HistoryContext);
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
        History Manager
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
        content={<Log records={getRecords()} />}
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
          <Content toggleMode={toggleMode} mode="task" />
        </HistoryProvider>
      ) : (
        <TaskProvider>
          <Content toggleMode={toggleMode} mode="history" />
        </TaskProvider>
      )}
    </>
  );
};

export default HistoryManager;
