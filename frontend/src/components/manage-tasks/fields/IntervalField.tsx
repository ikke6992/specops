import { useContext } from "react";
import { TaskModalContext } from "../../../contexts/TaskModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const IntervalField = () => {
  const { interval, setInterval } = useContext(TaskModalContext);

  return (
    <>
      <label>Interval (days): </label>
      <div className="flex flex-row items-center">
        <input
          type="number"
          className="border rounded-md p-1 outline-none border-gray-400"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value))}
        />
        <div className="group">
          <FontAwesomeIcon className="pr-1 ml-2" icon={faInfoCircle} />
          <span className="absolute scale-0 bg-black text-xs text-white rounded-lg p-2 mt-2 group-hover:scale-100 min-w-60">
            The number of days between the last execution date and the next
            deadline
          </span>
        </div>
      </div>
    </>
  );
};

export default IntervalField;
