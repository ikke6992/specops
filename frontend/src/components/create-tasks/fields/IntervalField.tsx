import { useState } from "react";

const IntervalField = () => {
  const [interval, setInterval] = useState<number>(0);

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
