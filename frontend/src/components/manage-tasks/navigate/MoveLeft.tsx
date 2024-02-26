import { useContext } from "react";
import { TaskContext } from "../../../contexts/TaskContext";

const MoveLeft = () => {
  const { moveLeft } = useContext(TaskContext);

  return (
    <button
      className="p-3 bg-teal-600 hover:bg-teal-300 border-gray-300 border-2 text-white"
      onClick={moveLeft}
    >
      ←
    </button>
  );
};

export default MoveLeft;
