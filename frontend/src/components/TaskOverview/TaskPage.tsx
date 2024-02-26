import React, { useEffect, useState } from "react";
import { Task } from "./TaskInterface";
import getAllTasks from "../../data/services/getAllTasks";
import TaskGrid from "./TaskGrid";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
        console.log(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="h-screen">
      <section className="bg-slate-500 h-1/4">
        <TaskGrid tasks={tasks} />
      </section>
      {/* Calendar Section */}
      <section className="bg-gray-400 h-3/4"></section>
    </main>
  );
};

export default TaskPage;
