import { Task } from "./TaskInterface";
import TaskPageCard from "./TaskPageCard";

interface Props {
  tasks: Task[];
}

const TaskGrid = ({ tasks }: Props) => {
  return (
    <div className="flex flex-row gap-x-4">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskPageCard key={task.id} task={task} />)
      ) : (
        <div>no tasks available!</div>
      )}
    </div>
  );
};

export default TaskGrid;
