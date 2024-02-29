import HistoryLog from "../../../models/log/HistoryLog";
import TaskLog from "../../../models/log/TaskLog";

const HistoryHead = () => {
  return (
    <tr className="">
      <th className="px-4 py-2 text-left text-gray-600">Label</th>
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
      <th className="px-4 py-2 text-left text-gray-600">Execution Date</th>
      <th className="px-4 py-2 text-left text-gray-600">Deadline</th>
      <th className="px-4 py-2 text-left text-gray-600">Assignee</th>
    </tr>
  );
};

const TaskHead = () => {
  return (
    <tr className="">
      <th className="px-4 py-2 text-left text-gray-600">Label</th>
      <th className="px-4 py-2 text-left text-gray-600">Name</th>
      <th className="px-4 py-2 text-left text-gray-600">Startdate</th>
      <th className="px-4 py-2 text-left text-gray-600">Deadline</th>
      <th className="px-4 py-2 text-left text-gray-600">Department</th>
    </tr>
  );
};

type PropsType = { firstLog: HistoryLog | TaskLog };
const LogHead = ({ firstLog }: PropsType) => {
  if (Object.keys(firstLog).includes("assignee")) {
    return <HistoryHead />;
  } else {
    return <TaskHead />;
  }
};

export default LogHead;
