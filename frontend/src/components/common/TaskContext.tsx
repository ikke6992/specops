import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  taskName: string
  setTaskName: (taskName: string) => void
}
type ProviderType = FC<{ children: ReactNode }>;


export const TaskContext = createContext<ContextType>({taskName: "", setTaskName:(taskName) => {
  return taskName
}});

export const TaskProvider: ProviderType = ({ children }) => {
  const [taskName, setTaskName] = useState<string>("");

  return (
    <TaskContext.Provider value={{ taskName, setTaskName }}>
      {children}
    </TaskContext.Provider>
  )
}