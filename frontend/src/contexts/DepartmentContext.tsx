import { FC, ReactNode, createContext, useEffect, useState } from "react";
import getAll from "../services/getAll";
import Department from "../models/Department";

type ContextType = {
  departments: Department[];
};

type ProviderType = FC<{ children: ReactNode }>;

export const DepartmentContext = createContext<ContextType>({
  departments: [],
});

export const DepartmentProvider: ProviderType = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const getDepartments = async () => {
      const data = await getAll("departments");
      setDepartments(data);
    };
    getDepartments();
  }, []);

  return (
    <DepartmentContext.Provider value={{ departments }}>
      {children}
    </DepartmentContext.Provider>
  );
};
