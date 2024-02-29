// Created using ChatGPT
import LogData from "./LogData";
import LogHead from "./LogHead";
import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";

type PropsType = {
  logs: HistoryLog[] | TaskLog[];
};
const Log = ({ logs }: PropsType) => {
  return (
    <table className="table-auto w-full">
      <thead>
        {logs
          .filter((_, i) => i === 0)
          .map((log, i) => (
            <LogHead key={i} firstLog={log} />
          ))}
      </thead>
      <tbody>
        {logs.map((log) => (
          <LogData key={log.id} log={log} />
        ))}
      </tbody>
    </table>
  );
};

export default Log;
