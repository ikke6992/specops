import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";

const TimeframeField = () => {
  const { timeframe, setTimeframe } = useContext(TaskModalContext);

  return (
    <>
      <label>Timeframe: </label>
      <input
        type="number"
        className="border rounded-md p-1 outline-none border-gray-400"
        value={timeframe}
        onChange={(e) => setTimeframe(parseInt(e.target.value))}
      />
    </>
  );
};

export default TimeframeField;
