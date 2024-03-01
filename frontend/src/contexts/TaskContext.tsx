import { createContext, FC, ReactNode, useEffect, useState } from "react";
import TaskResponse from "../models/task/TaskResponse";
import getAllTasks from "../services/getAllTasks";
import TaskBody from "../models/task/TaskBody";
import postItem from "../services/postItem";
import updateTask from "../services/updateTask";
import editItem from "../services/editItem";
import TaskLog from "../models/log/TaskLog";

type ContextType = {
  getTasks: () => TaskResponse[];
  getLogs: () => TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  addTask: (task: TaskBody) => void;
  editTask: (id: string, task: TaskBody) => void;
  completeTask: (id: string) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const TaskContext = createContext<ContextType>({
  getTasks: () => [],
  getLogs: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
  addTask: () => {},
  editTask: () => {},
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

  const getLogs = () => {
    const logs: TaskLog[] = getTasks().map((task) => {
      return {
        id: task.id,
        status: task.status,
        name: task.name,
        startdate: task.startDate,
        deadline: task.deadline,
        department: task.department,
      };
    });

    return logs;
  };

  const addTask = async (task: TaskBody) => {
    const data: TaskResponse = await postItem("tasks", task);
    console.log(data);
    setTasks([...tasks, data]);
  };

  const editTask = async (id: string, task: TaskBody) => {
    const data: TaskResponse = await editItem("tasks", id, task);
    const updatedTasks = tasks.map((task) => (task.id === id ? data : task));
    setTasks(updatedTasks);
  };

  const completeTask = async (id: string) => {
    // THIS NEEDS TO BE UPDATED
    // Task status should change
    // const data: TaskResponse = await updateTask("tasks", id);
    // setTasks([...tasks, data]);
    const newTask = await updateTask("tasks", id);
    const newList = [...tasks.filter((task) => task.id !== id), newTask];
    setTasks(newList);
  };

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        getLogs,
        setSize,
        moveRight,
        moveLeft,
        addTask,
        editTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
