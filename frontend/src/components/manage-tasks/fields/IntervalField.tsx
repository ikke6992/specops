import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const IntervalField = () => {
  const { interval, setInterval } = useContext(TaskModalContext);

  return (
    <div style={{ display: "flex" }}>
      <label>
        Interval:{" "}
        <input
          type="number"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
        />
      </label>
      <div className="group">
        <FontAwesomeIcon className="pr-1" icon={faInfoCircle} />
        <span className="absolute scale-0 bg-black text-xs text-white rounded-lg p-2 mt-2 group-hover:scale-100">
          The amount of days between the last execution date and the next
          deadline
        </span>
      </div>
    </div>
  );
};

export default IntervalField;
