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
  timeframe: string;
  interval: string;
  dept: string;
  start: string;
  end: string;
  canComplete: boolean;
  completeTask: () => void;
};
const Card1 = ({
  id,
  name,
  timeframe,
  interval,
  dept,
  start,
  end,
  canComplete: shouldComplete,
  completeTask,
}: PropsType) => {
  const [showEditor, setShowEditor] = useState(false);
  const { editTask, deactivateTask } = useContext(TaskContext);
  return (
    <>
      <article
        className="container mx-auto min-w-max max-w-sm relative bg-white rounded-xl shadow-md overflow-hidden p-5 h-fit hover:bg-slate-200 hover:cursor-pointer"
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            !e.target.classList.contains("no-click")
          ) {
            setShowEditor(true);
          }
        }}
      >
        <a>
          <div className="flex justify-between items-end">
            <div>
              <Card1Label dept={dept} />
            </div>
            <div className="absolute right-4 top-4">
              <Card1CompleteButton completeTask={completeTask} completeStatus={shouldComplete}/>
            </div>
          </div>
          <div className="mb-4">
            <Card1Name name={name} />
          </div>
          <div>
            <Card1Status start={start} end={end} />
          </div>
          <div>
            <Card1Dates start={start} end={end} />
          </div>
        </a>
      </article>
      {showEditor && (
        <TaskEditor
          name={name}
          dept={dept}
          timeframe={timeframe}
          interval={interval}
          deadline={end}
          submit={(task: TaskBody) => editTask(id, task)}
          deactivate={() => deactivateTask(id)}
          close={() => setShowEditor(false)}
        />
      )}
    </>
  );
};

export default Card1;
