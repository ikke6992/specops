import { useEffect, useState } from "react";
import TaskStatus from "../../../models/task/TaskStatus";
import RecordStatus from "../../../models/record/RecordStatus";

type PropsType = { status: TaskStatus | RecordStatus };
const LogLabel = ({ status }: PropsType) => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const determineColor = () => {
      let color: string;
      switch (status) {
        case "inactive":
          color = "bg-gray-500"
          break;
        case "planned":
        case "on time":
          color = "bg-green-500";
          break;
        case "pending":
          color = "bg-yellow-500";
          break;
        case "overdue":
        case "too late":
          color = "bg-red-500";
          break;
      }
      setBackground(color);
    };
    determineColor();
  }, [status]);

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-medium text-white ${background} rounded`}
    >
      {status}
    </span>
  );
};

export default LogLabel;
