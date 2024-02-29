import React from "react";
import { Task } from "./TaskInterface";

interface Props {
  task: Task;
}

const TaskPageCard = ({ task }: Props) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <label className="font-bold text-xl mb-2">{task.name}</label>
          <br />
          <label className="text-slate-400">{task.tempEmployee}</label>
          <div className="pt-2">
            <div className="bg-gray-200 rounded-full">
              <div
                className="bg-blue-500 text-s font-medium text-white text-center p-1 leading-none rounded-full"
                style={{ width: "45%" }}
              >
                {" "}
                45%
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Label 1
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Label 2
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskPageCard;
