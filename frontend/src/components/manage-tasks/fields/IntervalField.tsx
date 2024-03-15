import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const IntervalField = () => {
  const { interval, setInterval } = useContext(TaskModalContext);

  return (
    <label>
      Interval:{" "}
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value))}
      />
    </label>
  );
};

export default IntervalField;
