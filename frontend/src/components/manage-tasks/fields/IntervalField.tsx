import { useContext, useState } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const IntervalField = () => {
  const { interval, setInterval } = useContext(TaskModalContext);
  const [focus, setFocus] = useState(false);

  return (
    <label>
      Interval:{" "}
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value))}
      />
      <FontAwesomeIcon
        className="pr-1"
        icon={faInfoCircle}
        onClick={() => setFocus(!focus)}
      />
      <p
        className={
          focus ? "bg-black text-xs text-white rounded-lg p-2 mt-2" : "hidden"
        }
      >
        The amount of days between the last execution date and the next deadline
      </p>
    </label>
  );
};

export default IntervalField;
