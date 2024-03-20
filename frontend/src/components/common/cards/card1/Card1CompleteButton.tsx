import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TaskComplete from "../../../manage-tasks/TaskComplete";

interface Props {
  completeTask: (notes: string) => void;
  completeStatus: boolean;
}

const Card1CompleteButton = ({ completeTask, completeStatus }: Props) => {
  const [askConfirm, setAskConfirm] = useState(false);
  return (
    <>
    <div className="flex p-1 gap-x-1 items-center relative">
      <span className="font-semibold">Completed:</span>
      <input
        type="checkbox"
        checked={!completeStatus}
        value=""
        className={`appearance-none shrink-0 w-4 h-4 border-2 rounded-sm bg-white checked:bg-green-100 border-black/50 hover:border-green-500 checked:border-green-500 no-click ${
          !completeStatus && "pointer-events-none"
        }`}
        onClick={(e) => setAskConfirm(true)}
      />
      {!completeStatus && (
        <FontAwesomeIcon
          className="absolute right-1.5 w-3 h-3 text-green-500 pointer-events-none"
          icon={faCheck}
        />
      )}
    </div>
    {askConfirm && (<TaskComplete completeTask={completeTask} close={() => setAskConfirm(false)} />)}
    </>
  );
};

export default Card1CompleteButton;
