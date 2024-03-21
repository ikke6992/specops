import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const DeadlineField = () => {
  const { deadline, setDeadline } = useContext(TaskModalContext);

  return (
    <>
      <label>Deadline: </label>
      <input
        type="date"
        className="border rounded-md p-1 outline-none border-gray-400"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
    </>
  );
};

export default DeadlineField;
