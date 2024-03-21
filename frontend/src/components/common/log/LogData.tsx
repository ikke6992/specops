import { useEffect, useRef, useState } from "react";
import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";
import LogLabel from "./LogLabel";
import deactivateItem from "../../../services/deactivateItem";
import activateItem from "../../../services/activateItem";

type PropsType = {
  log: HistoryLog | TaskLog;
};

const HistoryData = (props: { log: HistoryLog }) => {
  return (
    <tr className=" h-20 max-h-20 border-t">
      <td className="px-4 py-2">
        <LogLabel status={props.log.status} />
      </td>
      <td className="px-4 py-2">{props.log.name}</td>
      <td className="px-4 py-2">{props.log.executionDate}</td>
      <td className="px-4 py-2">{props.log.deadline}</td>
      <td className="px-4 py-2">{props.log.assignee}</td>
      <td className="px-4 py-2">{props.log.notes}</td>
    </tr>
  );
};

const TaskData = (props: { log: TaskLog }) => {
  const [active, setActive] = useState<boolean>(
    props.log.status !== "inactive"
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      const handleChange = (id: string) => {
        active ? activateItem("tasks", id) : deactivateItem("tasks", id);
      };

      handleChange(props.log.id);
    } else {
      isInitialMount.current = false;
    }
  }, [active, props.log.id]);

  return (
    <tr className="h-20 max-h-20 border-t">
      <td className="px-4 py-2">
        <LogLabel status={props.log.status} />
      </td>
      <td className="px-4 py-2">{props.log.name}</td>
      <td className="px-4 py-2">{props.log.timeframe}</td>
      <td className="px-4 py-2">{props.log.interval}</td>
      <td className="px-4 py-2">{props.log.department}</td>
      <td className="px-4 py-2">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={active}
            readOnly
          />
          <div
            onClick={() => setActive(!active)}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label>
      </td>
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
