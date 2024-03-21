import { useContext } from "react";
import {
  OrganizationContext,
  OrganizationProvider,
} from "../../contexts/OrganizationContext";
import Layout from "../common/layout/Layout";
import { useParams } from "react-router-dom";
import UserManager from "./users/UserManager";
import DepartmentManager from "./deparments/DepartmentManager";

const OrganizationContent = () => {
  const { type } = useParams();
  const { search } = useContext(OrganizationContext);
  return (
    <Layout
      search={search}
      header={type === "users" ? "User Management" : "Department Management"}
      content={type === "users" ? <UserManager /> : <DepartmentManager />}
      isHistory={false}
      isDashboard={true}
    />
  );
};

const OrganizationManager = () => {
  return (
    <>
      <OrganizationProvider>
        <OrganizationContent />
      </OrganizationProvider>
    </>
  );
};

export default OrganizationManager;
