import React, { useEffect, useState } from "react";
import TaskPageCard from "./TaskPageCard";
import { Task } from "../common/TaskInterface";
import getAllTasks from "../../data/services/getAllTasks";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(tasks);
  }, []);

  return (
    <main className="h-screen">
      <section className="bg-slate-500 h-1/4">
        {tasks.map((task) => (
          <TaskPageCard
            key={task.id}
            name={task.name}
            employee={task.tempEmployee}
          />
        ))}
      </section>
      {/* Calendar Section */}
      <section className="bg-gray-400 h-3/4"></section>
    </main>
  );
};

export default TaskPage;
