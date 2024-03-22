import DepartmentLog from "../../../models/log/DepartmentLog";
import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";
import UserLog from "../../../models/log/UserLog";

const HistoryHead = () => {
  return (
    <tr className="border-b-2 border-gray-500/30">
      <th className="px-4 py-2 text-left text-gray-600">Status</th>
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
      <th className="px-4 py-2 text-left text-gray-600">Execution Date</th>
      <th className="px-4 py-2 text-left text-gray-600">Deadline</th>
      <th className="px-4 py-2 text-left text-gray-600">Assignee</th>
      <th className="px-4 py-2 text-left text-gray-600">Notes</th>
    </tr>
  );
};

const TaskHead = () => {
  return (
    <tr className="border-b-2 border-gray-500/30">
      <th className="px-4 py-2 text-left text-gray-600">Status</th>
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
      <th className="px-4 py-2 text-left text-gray-600">Timeframe</th>
      <th className="px-4 py-2 text-left text-gray-600">Interval</th>
      <th className="px-4 py-2 text-left text-gray-600">Department</th>
      <th className="px-4 py-2 text-left text-gray-600">Activate</th>
    </tr>
  );
};

const DepartmentHead = () => {
  return (
    <tr className="border-b-2 border-gray-500/30">
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
    </tr>
  );
};

const UserHead = () => {
  return (
    <tr className="border-b-2 border-gray-500/30">
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
      <th className="px-4 py-2 text-left text-gray-600">Role</th>
      <th className="px-4 py-2 text-left text-gray-600">Department</th>
    </tr>
  );
};

type PropsType = { firstLog: HistoryLog | TaskLog | DepartmentLog | UserLog };
const LogHead = ({ firstLog }: PropsType) => {
  if (Object.keys(firstLog).includes("assignee")) {
    return <HistoryHead />;
  } else if (Object.keys(firstLog).includes("interval")) {
    return <TaskHead />;
  } else if (Object.keys(firstLog).includes("role")) {
    return <UserHead />;
  } else {
    return <DepartmentHead />;
  }
};

export default LogHead;
