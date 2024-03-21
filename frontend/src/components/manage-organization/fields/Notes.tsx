import { useContext } from "react";
import { ConfirmationContext } from "../../../contexts/ConfirmationContext";

const Notes = () => {
  const {notes, setNotes} = useContext(ConfirmationContext);
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
