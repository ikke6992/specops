import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string;
  timeframe: number;
  interval: number;
  deadline: string;
  dept: string;
  setTaskName: (taskName: string) => void;
  setTimeframe: (timeframe: number) => void;
  setInterval: (interval: number) => void;
  setDeadline: (deadline: string) => void;
  setDept: (dept: string) => void;
};
type ProviderType = FC<{ children: ReactNode }>;

export const TaskModalContext = createContext<ContextType>({
  taskName: "",
  dept: "",
  timeframe: 0,
  interval: 0,
  deadline: "",
  setTaskName: (taskName) => {
    return taskName;
  },
  setDept: (dept) => {
    return dept;
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
});

export const TaskModalProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [timeframe, setTimeframe] = useState<number>(0);
  const [interval, setInterval] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>("");

  return (
    <TaskModalContext.Provider
      value={{
        taskName,
        dept,
        timeframe,
        interval,
        deadline,
        setTaskName,
        setDept,
        setTimeframe,
        setInterval,
        setDeadline,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};
