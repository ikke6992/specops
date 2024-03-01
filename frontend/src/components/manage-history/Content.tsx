import { useNavigate } from "react-router-dom";
import HistoryLog from "../../models/log/HistoryLog";
import TaskLog from "../../models/log/TaskLog";
import useWindowDimensions from "../../utils/windowdimensions";
import { useEffect } from "react";
import size from "../../utils/loglistsize";
import NavigateButton from "../common/buttons/NavigateButton";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import FunctionButton from "../common/buttons/FunctionButton";
import Log from "../common/log/Log";
import Layout from "../common/layout/Layout";

type PropsType = {
  toggleMode: () => void;
  mode: "tasks" | "history";
  getLogs: () => HistoryLog[] | TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
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
        {mode === "tasks" ? "History List" : "Task List"}
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <>
        {/* Go to task dashboard */}
        <NavigateButton
          name="Open dashboard"
          navigate={() => {
            navigate("/tasks");
          }}
        />
        {/* Browse through tasks */}
        <div className="p-2 flex flex-row justify-center items-center">
          <MoveLeftButton moveLeft={() => moveLeft()} />
          <MoveRightButton moveRight={() => moveRight()} />
        </div>
        <FunctionButton method={() => toggleMode()} name={`View ${mode}`} />
      </>
    );
  };

  return (
    <>
      <Layout
        searchBar={<SearchBar />}
        content={<Log logs={getLogs()} />}
        navigation={<Navigation />}
        isHistory={mode === "tasks"}
      />
    </>
  );
};

export default Content;
