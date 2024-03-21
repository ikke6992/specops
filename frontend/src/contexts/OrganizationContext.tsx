import { createContext, FC, ReactNode, useEffect, useState } from "react";
import DepartmentLog from "../models/log/DepartmentLog";
import UserLog from "../models/log/UserLog";
import SearchFilter from "../models/filter/SearchFilter";
import getAllUsers from "../services/getAllUsers";
import getAllDepartments from "../services/getAllDepartments";

type ContextType = {
  getUsers: () => UserLog[];
  getDepartments: () => DepartmentLog[];
  search: (type: SearchFilter, query: string) => void;
  submitDepartment: (type: "create" | "edit", name: string) => void;
  submitUser: (
    type: "create" | "edit",
    name: string,
    role: string,
    department: string
  ) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const OrganizationContext = createContext<ContextType>({
  getUsers: () => [],
  getDepartments: () => [],
  search: () => {},
  submitDepartment: () => {},
  submitUser: () => {},
});

export const OrganizationProvider: ProviderType = ({ children }) => {
  const [users, setUsers] = useState<UserLog[]>([]);
  const [departments, setDepartments] = useState<DepartmentLog[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getUserList = async () => {
      const users = await getAllUsers();
      const deps = await getAllDepartments();
      setUsers(users);
      setDepartments(deps);
    };
    getUserList();
  }, []);

  const getUsers = () => {
    return applySearch(users);
  };

  const getDepartments = () => {
    return departments;
  };

  const applySearch = (list: UserLog[]) => {
    if (query === "") {
      return list;
    }
    return list.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const search = (newQuery: string) => {
    setQuery(newQuery);
  };

  const submitDepartment = (type: "create" | "edit", name: string) => {
    if (type === "create") {
    } else {
    }
  };

  const submitUser = (
    type: "create" | "edit",
    name: string,
    role: string,
    department: string
  ) => {
    if (type === "create") {
    } else {
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        getUsers,
        getDepartments,
        search,
        submitDepartment,
        submitUser,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
