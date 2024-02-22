import { createContext, FC, ReactNode, useEffect, useState } from "react";
import TaskResponse from "../models/task/TaskResponse";
import getAllTasks from "../services/getAllTasks";

type ContextType = {
  getTasks: () => TaskResponse[];
  setSize: (size: number) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const TaskListContext = createContext<ContextType>({
  getTasks: () => [],
  setSize: () => {},
});

export const TaskListProvider: ProviderType = ({ children }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    getTaskList();
  }, []);

  const getTasks = () => {
    return tasks.slice(0, size);
  };

  return (
    <TaskListContext.Provider value={{ getTasks, setSize }}>
      {children}
    </TaskListContext.Provider>
  );
};
