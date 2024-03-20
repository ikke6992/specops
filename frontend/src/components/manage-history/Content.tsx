import HistoryLog from "../../models/log/HistoryLog";
import TaskLog from "../../models/log/TaskLog";
import useWindowDimensions from "../../utils/windowdimensions";
import { useEffect } from "react";
import size from "../../utils/loglistsize";

import Log from "../common/log/Log";
import Layout from "../common/layout/Layout";
import TaskStatus from "../../models/task/TaskStatus";
import RecordStatus from "../../models/record/RecordStatus";
import SearchFilter from "../../models/filter/SearchFilter";

type PropsType = {
  mode: "tasks" | "history";
  getLogs: () => HistoryLog[] | TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  search: (type: SearchFilter, query: string) => void;
};
const Content = ({ mode, getLogs, setSize, filter, search }: PropsType) => {
  const { height } = useWindowDimensions();

  useEffect(() => {
    const updateSize = () => {
      const newSize = size(height);
      setSize(newSize);
    };
    updateSize();
  }, [height, setSize]);

  return (
    <>
      <Layout
        header={mode === "tasks" ? "History List" : "Task List"}
        content={<Log logs={getLogs()} />}
        isHistory={mode === "tasks"}
        filter={filter}
        search={search}
      />
    </>
  );
};

export default Content;
