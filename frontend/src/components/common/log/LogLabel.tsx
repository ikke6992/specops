import { useEffect, useState } from "react";
import StatusType from "../../../models/record/StatusType";

type PropsType = { status: StatusType };
const LogLabel = ({ status }: PropsType) => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const determineColor = () => {
      let color: string;
      switch (status) {
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
