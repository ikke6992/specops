import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  completeTask: () => void;
  completeStatus: boolean;
}

const Card1CompleteButton = ({ completeTask, completeStatus }: Props) => {
  return (
    <div className="flex p-1 gap-x-1 items-center relative">
      <span className="font-semibold">Completed:</span>
      <input
        type="checkbox"
        checked={!completeStatus}
        value=""
        className={`appearance-none shrink-0 w-4 h-4 border-2 rounded-sm bg-white checked:bg-green-100 border-black/50 hover:border-green-500 checked:border-green-500 no-click ${
          !completeStatus && "pointer-events-none"
        }`}
        onClick={completeTask}
      />
      {!completeStatus && (
        <FontAwesomeIcon
          className="absolute right-1.5 w-3 h-3 text-green-500 pointer-events-none"
          icon={faCheck}
        />
      )}
    </div>
  );
};

export default Card1CompleteButton;
