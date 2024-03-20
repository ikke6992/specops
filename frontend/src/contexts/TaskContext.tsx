import { createContext, FC, ReactNode, useEffect, useState } from "react";
import TaskResponse from "../models/task/TaskResponse";
import getAllTasks from "../services/getAllTasks";
import TaskBody from "../models/task/TaskBody";
import postItem from "../services/postItem";
import updateTask from "../services/updateTask";
import editItem from "../services/editItem";
import TaskLog from "../models/log/TaskLog";
import StatusFilter from "../models/filter/StatusFilter";
import TaskStatus from "../models/task/TaskStatus";
import SearchFilter from "../models/filter/SearchFilter";
import deactivateItem from "../services/deactivateItem";

type ContextType = {
  getTasks: () => TaskResponse[];
  getLogs: () => TaskLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  addTask: (task: TaskBody) => void;
  editTask: (id: string, task: TaskBody) => void;
  deactivateTask: (id: string) => void;
  completeTask: (id: string, notes: string) => void;
  search: (type: SearchFilter, querry: string) => void;
  filter: (status: StatusFilter) => void;
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
  deactivateTask: () => {},
  completeTask: () => {},
  search: () => {},
  filter: () => {},
});

export const TaskProvider: ProviderType = ({ children }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [size, setSize] = useState(0);
  const [pointer, setPointer] = useState(0);
  const [querry, setQuerry] = useState("");
  const [type, setType] = useState<"dept" | "name">("name");
  const [status, setStatus] = useState<
    "all" | "pending" | "planned" | "overdue"
  >("all");

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    getTaskList();
  }, []);

  // Navigation
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

  // Getters
  const getTasks = () => {
    return apply(tasks);
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

  // Setters
  const addTask = async (task: TaskBody) => {
    const data: TaskResponse = await postItem("tasks", task);
    const newTasks = [...tasks, data].sort((task1, task2) =>
      compareDates(task1, task2)
    );
    setTasks(newTasks);
  };

  const compareDates = (task1: TaskResponse, task2: TaskResponse) => {
    const date1 = Date.parse(task1.deadline);
    const date2 = Date.parse(task2.deadline);
    return date1 - date2;
  };

  const editTask = async (id: string, task: TaskBody) => {
    const data: TaskResponse = await editItem("tasks", id, task);
    let updatedTasks = tasks.map((task) => (task.id === id ? data : task));
    updatedTasks = updatedTasks.sort((task1, task2) =>
      compareDates(task1, task2)
    );
    setTasks(updatedTasks);
  };

  const deactivateTask = async (id: string) => {
    await deactivateItem("tasks", id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = async (id: string, notes: string) => {
    const newTask = await updateTask("tasks", id, notes);
    let newList = [...tasks.filter((task) => task.id !== id), newTask];
    newList = newList.sort((task1, task2) => compareDates(task1, task2));
    setTasks(newList);
  };

  // Search & Filter
  const apply = (list: TaskResponse[]) => {
    return applyFilter(applySearch(list));
  };

  const applySearch = (list: TaskResponse[]) => {
    if (querry === "") {
      return list;
    }

    if (type === "dept") {
      return list.filter((task) =>
        task.department.toLowerCase().includes(querry.toLowerCase())
      );
    } else {
      return list.filter((task) =>
        task.name.toLowerCase().includes(querry.toLowerCase())
      );
    }
  };

  const applyFilter = (list: TaskResponse[]) => {
    if (status === "all") {
      return list;
    } else {
      return list.filter((task) => task.status === status);
    }
  };

  const search = (newType: SearchFilter, newQuerry: string) => {
    setType(newType as "dept" | "name");
    setQuerry(newQuerry);
  };

  const filter = (newStatus: StatusFilter) => {
    setStatus(newStatus as TaskStatus);
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
        deactivateTask,
        completeTask,
        search,
        filter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
