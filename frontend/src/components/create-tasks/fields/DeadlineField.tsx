import { useState } from "react";

const DeadlineField = () => {
  const [deadline, setDeadline] = useState("");

  return (
    <label>
      Deadline:{" "}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
    </label>
  );
};

export default DeadlineField;
