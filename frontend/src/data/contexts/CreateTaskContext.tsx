import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string;
  setTaskName: (taskName: string) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const CreateTaskContext = createContext<ContextType>({
  taskName: "",
  setTaskName: (taskName) => {
    return taskName;
  },
});

export const CreateTaskProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");

  return (
    <CreateTaskContext.Provider value={{ taskName, setTaskName }}>
      {children}
    </CreateTaskContext.Provider>
  );
};
