import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const NameField = () => {
  const { taskName, setTaskName } = useContext(TaskModalContext);

  return (
    <label>
      Name:{" "}
      <input
        type="text"
        placeholder="task name"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
    </label>
  );
};

export default NameField;
