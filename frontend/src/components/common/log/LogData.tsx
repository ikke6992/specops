import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";
import LogLabel from "./LogLabel";

type PropsType = {
  log: HistoryLog | TaskLog;
};

const HistoryData = (props: { log: HistoryLog }) => {
  return (
    <tr className="border-b border-gray-600 h-20 max-h-20">
      <td className="px-4 py-2">
        <LogLabel status={props.log.status} />
      </td>
      <td className="px-4 py-2">{props.log.name}</td>
      <td className="px-4 py-2">{props.log.executionDate}</td>
      <td className="px-4 py-2">{props.log.deadline}</td>
      <td className="px-4 py-2">{props.log.assignee}</td>
    </tr>
  );
};

const TaskData = (props: { log: TaskLog }) => {
  return (
    <tr className="border-b border-gray-600 h-20 max-h-20">
      <td className="px-4 py-2">
        <LogLabel status={props.log.status} />
      </td>
      <td className="px-4 py-2">{props.log.name}</td>
      <td className="px-4 py-2">{props.log.startdate}</td>
      <td className="px-4 py-2">{props.log.deadline}</td>
      <td className="px-4 py-2">{props.log.department}</td>
    </tr>
  );
};

const LogData = ({ log }: PropsType) => {
  if (Object.keys(log).includes("assignee")) {
    return <HistoryData log={log as HistoryLog} />;
  } else {
    return <TaskData log={log as TaskLog} />;
  }
};

export default LogData;
