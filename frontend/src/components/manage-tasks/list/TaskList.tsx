import { useContext, useEffect } from "react";
import { TaskContext } from "../../../contexts/TaskContext";
import Card1 from "../../common/cards/card1/Card1";
import { rows, cols, size } from "../../../utils/tasklistsize";
import useWindowDimensions from "../../../utils/windowdimensions";

const TaskList = () => {
  const { width, height } = useWindowDimensions();
  const { getTasks, setSize, completeTask } = useContext(TaskContext);

  useEffect(() => {
    setSize(size(height, width));
  });

  return (
    <div
      className="h-full w-full"
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows(height)}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols(width)}, minmax(0, 1fr))`,
        columnGap: "2em",
        rowGap: "2em",
      }}
    >
      {getTasks().map((task) => {
        return (
          <Card1
            key={task.taskId}
            editId={task.taskPlanningId}
            name={task.name}
            canComplete={task.status !== "planned"}
            completeTask={() => completeTask(task.taskId)}
            dept={task.department.name}
            start={task.startDate}
            end={task.deadline}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
