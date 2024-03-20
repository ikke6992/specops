import { useState } from "react";
import TaskComplete from "../../../manage-tasks/TaskComplete";

interface Props {
  completeTask: (notes: string) => void;
}

const Card1CompleteButton = ({ completeTask }: Props) => {
  const [askConfirm, setAskConfirm] = useState(false);
  return (
    <>
    <button
      className="bg-green-500 hover:bg-green-600 rounded p-1 no-click border-2 border-green-600"
      onClick={(e) => setAskConfirm(true)}
    >
      Complete
    </button>
    {askConfirm && (<TaskComplete completeTask={completeTask} close={() => setAskConfirm(false)} />)}
    </>
  );
};

export default Card1CompleteButton;
