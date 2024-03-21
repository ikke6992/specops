import DepartmentLog from "../../models/log/DepartmentLog";
import SearchFilter from "../../models/filter/SearchFilter";
import UserLog from "../../models/log/UserLog";
import Layout from "../common/layout/Layout";
import { useEffect, useState } from "react";
import ManagementDashboard from "./ManagementDashboard";

type Props = {
  getUsers: () => UserLog[];
  getDepartments: () => DepartmentLog[];
  search: (type: SearchFilter, query: string) => void;
};

const UserContent = ({ getUsers, getDepartments, search }: Props) => {
  const [users, setUsers] = useState<UserLog[]>([]);
  const [departments, setDepartments] = useState<DepartmentLog[]>([]);
  
  useEffect(() => {
    const fetchManagementData = async () => {
      const fetchedUsers = getUsers();
      const fetchedDepartments = getDepartments();
      setUsers(fetchedUsers);
      setDepartments(fetchedDepartments);
    };
    fetchManagementData();
  }, []);

  return (
    <>
      <Layout
        header={"Management Dashboard"}
        content={
          <ManagementDashboard users={users} departments={departments} />
        }
        search={search}
      />
    </>
  );
};

export default UserContent;
