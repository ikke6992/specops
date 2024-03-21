import { useContext, useEffect } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import Card1 from "../common/cards/card1/Card1";

const TaskList = () => {
  const { getTasks, completeTask } = useContext(TaskContext);

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
            completeTask={(notes: string) => completeTask(task.id, notes)}
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
