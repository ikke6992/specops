import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string;
  setTaskName: (taskName: string) => void;
};
type ProviderType = FC<{ children: ReactNode }>;

export const EditTaskContext = createContext<ContextType>({
  taskName: "",
  setTaskName: (taskName) => {
    return taskName;
  },
});

export const EditTaskProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");

  return (
    <EditTaskContext.Provider value={{ taskName, setTaskName }}>
      {children}
    </EditTaskContext.Provider>
  );
};
