import { FC, ReactNode, createContext, useEffect, useState } from "react";

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
  valid: boolean;
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
  valid: false,
});

export const TaskModalProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [timeframe, setTimeframe] = useState<number>(0);
  const [interval, setInterval] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>("");
  const [validName, setValidName] = useState(false);
  const [validTimeFrame, setValidTimeFrame] = useState(false);
  const [validInterval, setValidInterval] = useState(false);
  const [validDeadline, setValidDeadline] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const TASK_REGEX = /^{5,23}$/;
    setValidName(TASK_REGEX.test(taskName));
  }, [taskName]);

  useEffect(() => {
    setValidTimeFrame(timeframe > 1);
  }, [timeframe]);

  useEffect(() => {
    setValidInterval(interval > 0);
  }, [interval]);

  useEffect(() => {
    setValidDeadline(Date.parse(deadline) >= Date.now());
  }, [deadline]);

  useEffect(() => {
    setValid(validName && validTimeFrame && validInterval && validDeadline);
  }, [taskName, timeframe, interval, deadline]);

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
        valid
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};
