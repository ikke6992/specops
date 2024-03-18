import { useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState("");
  return (
    <label className="no-click">
      Notes:{" "}
      <input
        className="no-click"
        type="text"
        placeholder="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </label>
  );
};

export default Notes;
