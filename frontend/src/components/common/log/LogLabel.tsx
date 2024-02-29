import { useEffect, useState } from "react";
import StatusType from "../../../models/record/StatusType";

type PropsType = { status: StatusType };
const LogLabel = ({ status }: PropsType) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const determineColor = () => {
      let name: string;
      switch (status) {
        case "planned":
        case "on time":
          name = "green";
          break;
        case "pending":
          name = "yellow";
          break;
        case "overdue":
        case "too late":
          name = "red";
          break;
      }
      console.log(name);
      setColor(name);
    };
    determineColor();
  }, [status]);

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-medium text-white bg-${color}-500 rounded`}
    >
      {status}
    </span>
  );
};

export default LogLabel;
