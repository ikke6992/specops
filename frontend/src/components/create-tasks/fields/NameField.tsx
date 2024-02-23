import { useContext } from "react";
import { CreateTaskContext } from "../../../contexts/CreateTaskContext";

const NameField = () => {
  const { taskName, setTaskName } = useContext(CreateTaskContext);

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
