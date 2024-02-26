import RecordResponse from "../../../models/record/RecordResponse";
import LogLabel from "./LogLabel";

const getDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

type PropsType = {
  record: RecordResponse;
};
const LogData = ({ record }: PropsType) => {
  return (
    <tr className="border-b border-gray-600 h-20 max-h-20">
      <td className="px-4 py-2">
        <LogLabel />
      </td>
      <td className="px-4 py-2">{record.name}</td>
      <td className="px-4 py-2">{getDateString(record.deadline)}</td>
      <td className="px-4 py-2">{getDateString(record.executionDate)}</td>
      <td className="px-4 py-2">{record.assignee}</td>
    </tr>
  );
};

export default LogData;
