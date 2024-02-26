import { useEffect, useState } from "react";
import getAll from "../../data/services/getAll";

interface Task {
  id: string;
  name: string;
  startDate: string;
  deadline: string;
  status: string;
}

const TaskTest = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await getAll("tasks");
        setTasks(fetchedTasks);
        console.log(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              Name: {task.name}
              <br />
              Deadline: {task.deadline}
              <br />
              Start Date: {task.startDate}
              <br />
              Status: {task.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TaskTest;