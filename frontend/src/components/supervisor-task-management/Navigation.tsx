import { useContext } from "react";
import { TaskListContext } from "../../data/contexts/TaskListContext";

const Navigation = () => {
  const { moveLeft, moveRight } = useContext(TaskListContext);

  return (
    <section
      className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
      style={{ height: "10%" }}
    >
      <div></div>
      <div className="p-2 flex flex-row justify-center items-center">
        <button
          className="p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white"
          onClick={moveLeft}
        >
          ←
        </button>
        <button
          className="ml-4 p-3 bg-cyan-600 hover:bg-cyan-300 border-gray-300 border-2 text-white"
          onClick={moveRight}
        >
          →
        </button>
      </div>
      <button className="bg-green-600 hover:bg-green-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white">
        Create Task
      </button>
    </section>
  );
};

export default Navigation;
