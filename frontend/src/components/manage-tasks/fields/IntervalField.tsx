import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const IntervalField = () => {
  const { interval, setInterval } = useContext(TaskModalContext);

  return (
    <>
      <label>Interval: </label>
      <input
        type="number"
        className="border rounded-md p-1 outline-none border-gray-400"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value))}
      />
    </>
  );
};

export default IntervalField;
