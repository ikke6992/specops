import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepartmentLog from "../../../models/log/DepartmentLog";
import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";
import UserLog from "../../../models/log/UserLog";
import LogLabel from "./LogLabel";
import { TaskContext } from "../../../contexts/TaskContext";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
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
  const {reactivateTask, deactivateTask} = useContext(TaskContext);
  const [active, setActive] = useState<boolean>(
    props.log.status !== "inactive"
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      const handleChange = (id: string) => {
        active ? reactivateTask(id) : deactivateTask(id);
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
              initialDepartment={props.log.department}
              initialName={props.log.name}
              initialRole={props.log.role}
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
              initialDepartment={props.log.name}
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
