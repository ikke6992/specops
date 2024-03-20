import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const NameField = () => {
  const { taskName, setTaskName } = useContext(TaskModalContext);

  return (
    <>
      <label>Name: </label>
      <input
        type="text"
        className="border rounded-md p-1 outline-none border-gray-400"
        placeholder="Task Name..."
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
    </>
  );
};

export default NameField;
