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
import getAll from "../services/getAll";

type ContextType = {
  getTasks: () => TaskResponse[];
  getLogs: () => TaskLog[];
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
  addTask: () => {},
  editTask: () => {},
  deactivateTask: () => {},
  completeTask: () => {},
  search: () => {},
  filter: () => {},
});

export const TaskProvider: ProviderType = ({ children }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [logs, setLogs] = useState<TaskLog[]>([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"dept" | "name">("name");
  const [status, setStatus] = useState<
    "all" | "pending" | "planned" | "overdue" | "inactive"
  >("all");

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    getTaskList();
  }, []);

  useEffect(() => {
    const getTaskLogs = async () => {
      const data = await getAll("tasks/list");
      setLogs(data);
    };
    getTaskLogs();
  }, []);

  // Getters
  const getTasks = () => {
    return apply(tasks) as TaskResponse[];
  };

  const getLogs = () => {
    return apply(logs);
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
  const apply = (list: TaskResponse[] | TaskLog[]) => {
    return applyFilter(applySearch(list));
  };

  const applySearch = (list: TaskResponse[] | TaskLog[]) => {
    if (query === "") {
      return list;
    }

    if (type === "dept") {
      return list.filter((task) =>
        task.department.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return list.filter((task) =>
        task.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const applyFilter = (list: TaskResponse[] | TaskLog[]) => {
    if (status === "all") {
      return list;
    } else {
      return list.filter((task) => task.status === status);
    }
  };

  const search = (newType: SearchFilter, newQuery: string) => {
    setType(newType as "dept" | "name");
    setQuery(newQuery);
  };

  const filter = (newStatus: StatusFilter) => {
    setStatus(newStatus as TaskStatus);
  };

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        getLogs,
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
