import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const TimeframeField = () => {
  const { timeframe, setTimeframe } = useContext(TaskModalContext);

  return (
    <label>
      Timeframe:{" "}
      <input
        type="number"
        value={timeframe}
        onChange={(e) => setTimeframe(parseInt(e.target.value))}
      />
    </label>
  );
};

export default TimeframeField;
