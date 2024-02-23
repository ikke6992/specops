import { useContext, useState } from "react";
import { TaskContext } from "../../data/contexts/TaskContext";
import Modal from "../common/modal/Modal";
import { CreateTaskProvider } from "../../data/contexts/CreateTaskContext";
import TaskBody from "../../data/models/task/TaskBody";

const Navigation = () => {
  const { moveLeft, moveRight, addTask } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);

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
      <button
        className="bg-green-600 hover:bg-green-300 pt-2 pb-2 pl-4 pr-4 border-gray-300  border-2 text-white"
        onClick={() => setShowModal(true)}
      >
        Create Task
      </button>
      {showModal && (
        <CreateTaskProvider>
          <Modal
            name="Add Task"
            onClick={() => setShowModal(false)}
            submit={(task: TaskBody) => addTask(task)}
          />
        </CreateTaskProvider>
      )}
    </section>
  );
};

export default Navigation;
