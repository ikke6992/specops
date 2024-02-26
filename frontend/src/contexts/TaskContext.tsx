import { createContext, FC, ReactNode, useEffect, useState } from "react";
import TaskResponse from "../models/task/TaskResponse";
import getAllTasks from "../services/getAllTasks";
import TaskBody from "../models/task/TaskBody";
import postItem from "../services/postItem";
import updateTask from "../services/updateTask";

type ContextType = {
  getTasks: () => TaskResponse[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  addTask: (task: TaskBody) => void;
  completeTask: (id: string) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const TaskContext = createContext<ContextType>({
  getTasks: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
  addTask: () => {},
  completeTask: () => {},
});

export const TaskProvider: ProviderType = ({ children }) => {
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

  const addTask = async (task: TaskBody) => {
    const data: TaskResponse = await postItem("tasks", { name: task.name });
    setTasks([...tasks, data]);
  };

  const completeTask = async (id: string) => {
    const data: TaskResponse = await updateTask("tasks", id);
    setTasks([...tasks, data]);
  };

  return (
    <TaskContext.Provider
      value={{ getTasks, setSize, moveRight, moveLeft, addTask, completeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
