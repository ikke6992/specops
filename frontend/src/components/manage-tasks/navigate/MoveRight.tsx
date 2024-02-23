import { useContext } from "react";
import { TaskContext } from "../../../contexts/TaskContext";

const MoveRight = () => {
  const { moveRight } = useContext(TaskContext);

  return (
    <button
      className="ml-4 p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white"
      onClick={moveRight}
    >
      →
    </button>
  );
};

export default MoveRight;
