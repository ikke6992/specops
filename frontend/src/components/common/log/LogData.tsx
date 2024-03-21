import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepartmentLog from "../../../models/log/DepartmentLog";
import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";
import UserLog from "../../../models/log/UserLog";
import LogLabel from "./LogLabel";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UserModal from "../../manage-organization/users/UserModal";
import DepartmentModal from "../../manage-organization/deparments/DepartmentModal";

type PropsType = {
  log: HistoryLog | TaskLog | UserLog | DepartmentLog;
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
  return (
    <tr className="h-20 max-h-20 border-t">
      <td className="px-4 py-2">
        <LogLabel status={props.log.status} />
      </td>
      <td className="px-4 py-2">{props.log.name}</td>
      <td className="px-4 py-2">{props.log.timeframe}</td>
      <td className="px-4 py-2">{props.log.interval}</td>
      <td className="px-4 py-2">{props.log.department}</td>
    </tr>
  );
};

const UserData = (props: { log: UserLog }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <tr className="h-20 max-h-20 border-t">
        <td className="px-4 py-2">
          <FontAwesomeIcon
            icon={faPencil}
            className="mr-4 w-5 h-5 hover:w-6 hover:h-6 hover:cursor-pointer touch:w-6 touch:h-6"
            onClick={() => setShowEdit(true)}
          />
          <span>{props.log.name}</span>
        </td>
        <td className="px-4 py-2">{props.log.role}</td>
        <td className="px-4 py-2">{props.log.department}</td>
        <td>
          {showEdit && (
            <UserModal
              close={() => setShowEdit(false)}
              type="edit"
              id={props.log.id}
            />
          )}
        </td>
      </tr>
    </>
  );
};

const DepartmentData = (props: { log: DepartmentLog }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <tr className="h-20 max-h-20 border-t">
        <td className="px-4 py-2">
          <FontAwesomeIcon
            icon={faPencil}
            className="mr-4 w-5 h-5 hover:w-6 hover:h-6 hover:cursor-pointer touch:w-6 touch:h-6"
            onClick={() => setShowEdit(true)}
          />
          <span>{props.log.name}</span>
        </td>
        <td>
          {showEdit && (
            <DepartmentModal
              close={() => setShowEdit(false)}
              type="edit"
              id={props.log.id}
            />
          )}
        </td>
      </tr>
    </>
  );
};

const LogData = ({ log }: PropsType) => {
  if (Object.keys(log).includes("assignee")) {
    return <HistoryData log={log as HistoryLog} />;
  } else if (Object.keys(log).includes("interval")) {
    return <TaskData log={log as TaskLog} />;
  } else if (Object.keys(log).includes("role")) {
    return <UserData log={log as UserLog} />;
  } else {
    return <DepartmentData log={log as DepartmentLog} />;
  }
};

export default LogData;
