// Created using ChatGPT
import LogData from "./LogData";
import LogHead from "./LogHead";
import RecordResponse from "../../../models/record/RecordResponse";

type PropsType = {
  records: RecordResponse[];
};
const Log = ({ records }: PropsType) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <LogHead />
      </thead>
      <tbody>
        {records.map((record) => (
          <LogData key={record.id} record={record} />
        ))}
      </tbody>
    </table>
  );
};

export default Log;
