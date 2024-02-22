import { createContext, FC, ReactNode, useEffect, useState } from "react";
import TaskResponse from "../models/task/TaskResponse";
import getAllTasks from "../services/getAllTasks";

type ContextType = {
  getTasks: () => TaskResponse[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const TaskListContext = createContext<ContextType>({
  getTasks: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
});

export const TaskListProvider: ProviderType = ({ children }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [size, setSize] = useState(0);
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    getTaskList();
  }, []);

  const moveRight = () => {
    if (pointer + size < tasks.length) {
      setPointer(pointer + size);
    }
  };

  const moveLeft = () => {
    if (pointer - size >= 0) {
      setPointer(pointer - size);
    }
  };

  const getTasks = () => {
    return tasks.slice(pointer, pointer + size);
  };

  return (
    <TaskListContext.Provider
      value={{ getTasks, setSize, moveRight, moveLeft }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
