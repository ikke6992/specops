import { useContext } from "react";
import { OrganizationContext } from "../../contexts/OrganizationContext";
import Log from "../common/log/Log";

const DepartmentManager = () => {
  const { getDepartments } = useContext(OrganizationContext);

  return <Log logs={getDepartments()} />;
};

export default DepartmentManager;
