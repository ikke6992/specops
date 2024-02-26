import StatusType from "../../../models/record/StatusType";

type PropsType = { status: StatusType };
const LogLabel = ({ status }: PropsType) => {
  const getColor = (status: StatusType) => {
    switch (status) {
      case "Planned":
      case "On time":
        return "green";
      case "Pending":
        return "yellow";
      case "Overdue":
      case "Too late":
        return "red";
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-medium text-white bg-${getColor(
        status
      )}-500 rounded`}
    >
      {status}
    </span>
  );
};

export default LogLabel;
