import HistoryLog from "../../models/log/HistoryLog";
import TaskLog from "../../models/log/TaskLog";
import useWindowDimensions from "../../utils/windowdimensions";
import { useEffect } from "react";
import size from "../../utils/loglistsize";
import MoveLeftButton from "../common/buttons/MoveLeftButton";
import MoveRightButton from "../common/buttons/MoveRightButton";
import FunctionButton from "../common/buttons/FunctionButton";
import Log from "../common/log/Log";
import Layout from "../common/layout/Layout";
import TaskStatus from "../../models/task/TaskStatus";
import RecordStatus from "../../models/record/RecordStatus";
import SearchFilter from "../../models/filter/SearchFilter";

type PropsType = {
  toggleMode: () => void;
  mode: "tasks" | "history";
  getLogs: () => HistoryLog[] | TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  search: (type: SearchFilter, query: string) => void;
};
const Content = ({
  toggleMode,
  mode,
  getLogs,
  setSize,
  moveRight,
  moveLeft,
  filter,
  search,
}: PropsType) => {
  const { height } = useWindowDimensions();

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
        {mode === "tasks" ? "Hisory List" : "Task List"}
      </h1>
    );
  };

  const Navigation = () => {
    return (
      <div className="flex justify-between">
        {/* Browse through tasks */}
        {/* <div className="flex justify-center object-bottom">
          <MoveLeftButton moveLeft={() => moveLeft()} />
          <MoveRightButton moveRight={() => moveRight()} />
        </div> */}
        <FunctionButton method={() => toggleMode()} name={`View ${mode}`} />
        <p className="text-white font-semibold text-xs">
          Itvitae - Java Groep 53
        </p>
      </div>
    );
  };

  return (
    <>
      <Layout
        searchBar={<SearchBar />}
        content={<Log logs={getLogs()} />}
        navigation={<Navigation />}
        isHistory={mode === "tasks"}
        filter={filter}
        search={search}
      />
    </>
  );
};

export default Content;
