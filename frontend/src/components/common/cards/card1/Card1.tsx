import { useContext, useState } from "react";
import Card1CompleteButton from "./Card1CompleteButton";
import Card1Dates from "./Card1Dates";
import Card1Label from "./Card1Label";
import Card1Name from "./Card1Name";
import Card1Status from "./Card1Status";
import TaskEditor from "../../../manage-tasks/TaskEditor";
import TaskBody from "../../../../models/task/TaskBody";
import { TaskContext } from "../../../../contexts/TaskContext";

type PropsType = {
  id: string;
  name: string;
  dept: string;
  start: string;
  end: string;
  canComplete: boolean;
  completeTask: () => void;
};
const Card1 = ({
  id,
  name,
  dept,
  start,
  end,
  canComplete: shouldComplete,
  completeTask,
}: PropsType) => {
  const [showEditor, setShowEditor] = useState(false);
  const { editTask } = useContext(TaskContext);
  return (
    <>
      <article
        className="container mx-auto max-w-sm relative bg-white rounded-xl shadow-md overflow-hidden p-5 h-fit hover:bg-slate-200 hover:cursor-pointer"
        onClick={() => setShowEditor(true)}
      >
        <a>
          <div className="flex justify-between items-end">
            <div>
              <Card1Label dept={dept} />
            </div>
            {shouldComplete && (
              <div className="absolute right-4 top-4">
                <Card1CompleteButton completeTask={completeTask} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <Card1Name name={name} />
          </div>
          <div>
            <Card1Status />
          </div>
          <div>
            <Card1Dates start={start} end={end} />
          </div>
        </a>
      </article>
      {showEditor && (
        <TaskEditor
          name={name}
          submit={(task: TaskBody) => editTask(id, task)}
          close={() => setShowEditor(false)}
        />
      )}
    </>
  );
};

export default Card1;
