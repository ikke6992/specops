import StatusType from "../../../models/record/StatusType";

type PropsType = { status: StatusType };
const LogLabel = ({ status }: PropsType) => {
  const getColor = (status: StatusType) => {
    switch (status) {
      case "planned":
      case "on time":
        return "green";
      case "pending":
        return "yellow";
      case "overdue":
      case "too late":
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
