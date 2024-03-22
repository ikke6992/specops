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
  validName: boolean;
  validTimeFrame: boolean;
  validInterval: boolean;
  validDeadline: boolean;
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
  validName: false,
  validTimeFrame: false,
  validInterval: false,
  validDeadline: false,
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
    const updateValidations = async () => {
    setValidName(taskName.length > 0);
    setValidTimeFrame(timeframe > 1);
    setValidInterval(interval > 0);
    setValidDeadline(Date.parse(deadline) >= Date.now());
    setValid(validName && validTimeFrame && validInterval && validDeadline);
    };

    updateValidations();
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
        validName,
        validTimeFrame,
        validInterval,
        validDeadline,
        valid,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};
