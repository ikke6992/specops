import HistoryLog from "../../models/log/HistoryLog";
import TaskLog from "../../models/log/TaskLog";

import Log from "../common/log/Log";
import Layout from "../common/layout/Layout";
import TaskStatus from "../../models/task/TaskStatus";
import RecordStatus from "../../models/record/RecordStatus";
import SearchFilter from "../../models/filter/SearchFilter";

type PropsType = {
  mode: "tasks" | "history";
  getLogs: () => HistoryLog[] | TaskLog[];
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  search: (type: SearchFilter, query: string) => void;
};
const Content = ({ mode, filter, getLogs, search }: PropsType) => {
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
