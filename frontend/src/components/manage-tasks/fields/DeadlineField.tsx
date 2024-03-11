import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const DeadlineField = () => {
  const { deadline, setDeadline } = useContext(TaskModalContext);

  return (
    <label>
      Deadline:{" "}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
    </label>
  );
};

export default DeadlineField;
