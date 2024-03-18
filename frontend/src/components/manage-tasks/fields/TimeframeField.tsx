import { useContext, useState } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const TimeframeField = () => {
  const { timeframe, setTimeframe } = useContext(TaskModalContext);
  const [focus, setFocus] = useState(false);

  return (
    <label>
      Timeframe:{" "}
      <input
        type="number"
        value={timeframe}
        onChange={(e) => setTimeframe(parseInt(e.target.value))}
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
        The amount of days before the next deadline the task becomes active
      </p>
    </label>
  );
};

export default TimeframeField;
