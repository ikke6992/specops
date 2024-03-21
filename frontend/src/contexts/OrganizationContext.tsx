import { createContext, FC, ReactNode, useEffect, useState } from "react";
import DepartmentLog from "../models/log/DepartmentLog";
import UserLog from "../models/log/UserLog";
import SearchFilter from "../models/filter/SearchFilter";
import getAllUsers from "../services/getAllUsers";
import getAllDepartments from "../services/getAllDepartments";
import postItem from "../services/postItem";
import putItem from "../services/putItem";

type ContextType = {
  getUsers: () => UserLog[];
  getDepartments: () => DepartmentLog[];
  search: (type: SearchFilter, query: string) => void;
  submitDepartment: (
    type: "create" | "edit",
    name: string,
    id?: string
  ) => void;
  submitUser: (
    type: "create" | "edit",
    name: string,
    role: "analyst" | "team manager" | "manager",
    department: string,
    id?: string
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

  const getRoles = (role: "analyst" | "team manager" | "manager") => {
    switch (role) {
      case "analyst":
        return "ROLE_USER";
      case "team manager":
        return "ROLE_USER, ROLE_MANAGER";
      case "manager":
        return "ROLE_USER, ROLE_MANAGER, ROLE_ADMIN";
    }
  };

  const submitDepartment = async (
    type: "create" | "edit",
    name: string,
    id?: string
  ) => {
    if (type === "create") {
      const data: DepartmentLog = await postItem("departments/create", {
        name,
      });
      setDepartments([...departments, data]);
    } else {
      const data: DepartmentLog = await putItem(`departments/edit/${id}`, {
        name,
      });
      const updatedDepartments = departments.map((department) =>
        department.id === id ? data : department
      );
      setDepartments(updatedDepartments);
    }
  };

  const submitUser = async (
    type: "create" | "edit",
    name: string,
    role: "analyst" | "team manager" | "manager",
    department: string,
    id?: string
  ) => {
    if (type === "create") {
      const data: UserLog = await postItem("users/create", {
        employeeName: name,
        roles: getRoles(role),
        department,
      });
      const updatedUsers = [...users, data];
      setUsers(updatedUsers);
    } else {
      const data: UserLog = await putItem(`users/edit/${id}`, {
        employeeName: name,
        roles: getRoles(role),
        department,
      });
      const updatedUsers = users.map((user) => (user.id === id ? data : user));
      setUsers(updatedUsers);
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
