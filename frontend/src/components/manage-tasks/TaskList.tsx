import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import Card1 from "../common/cards/card1/Card1";
import { size } from "../../utils/tasklistsize";
import useWindowDimensions from "../../utils/windowdimensions";

const TaskList = () => {
  const { width, height } = useWindowDimensions();
  const { getTasks, setSize, completeTask } = useContext(TaskContext);

  useEffect(() => {
    setSize(size(height, width));
  });

  return (
    <div className="h-auto w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {getTasks().map((task) => {
        return (
          <Card1
            key={task.id}
            id={task.id}
            name={task.name}
            timeframe={task.timeframe}
            interval={task.interval}
            canComplete={task.status !== "planned"}
            completeTask={() => completeTask(task.id)}
            dept={task.department}
            start={task.startDate}
            end={task.deadline}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
