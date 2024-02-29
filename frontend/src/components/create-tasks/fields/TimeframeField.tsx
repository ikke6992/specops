import { useState } from "react";

const TimeframeField = () => {
  const [timeframe, setTimeframe] = useState<number>(0);

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
