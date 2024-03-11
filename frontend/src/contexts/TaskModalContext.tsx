import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string;
  timeframe: number;
  interval: number;
  deadline: string;
  department: string;
  setTaskName: (taskName: string) => void;
  setTimeframe: (timeframe: number) => void;
  setInterval: (interval: number) => void;
  setDeadline: (deadline: string) => void;
  setDepartment: (department: string) => void;
};
type ProviderType = FC<{ children: ReactNode }>;

export const TaskModalContext = createContext<ContextType>({
  taskName: "",
  timeframe: 0,
  interval: 0,
  deadline: "",
  department: "",
  setTaskName: (taskName) => {
    return taskName;
  },
  setTimeframe: (timeframe) => {
    return timeframe;
  },
  setInterval: (interval) => {
    return interval;
  },
  setDeadline: (deadline) => {
    return deadline;
  },
  setDepartment: (department) => {
    return department;
  },
});

export const TaskModalProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [timeframe, setTimeframe] = useState<number>(0);
  const [interval, setInterval] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  return (
    <TaskModalContext.Provider
      value={{
        taskName,
        timeframe,
        interval,
        deadline,
        department,
        setTaskName,
        setTimeframe,
        setInterval,
        setDeadline,
        setDepartment,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};
