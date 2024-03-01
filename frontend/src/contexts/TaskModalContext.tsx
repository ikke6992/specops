import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string;
  setTaskName: (taskName: string) => void;
};
type ProviderType = FC<{ children: ReactNode }>;

export const TaskModalContext = createContext<ContextType>({
  taskName: "",
  setTaskName: (taskName) => {
    return taskName;
  },
});

export const TaskModalProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");

  return (
    <TaskModalContext.Provider value={{ taskName, setTaskName }}>
      {children}
    </TaskModalContext.Provider>
  );
};
