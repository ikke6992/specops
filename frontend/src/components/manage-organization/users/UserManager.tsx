import { useContext } from "react";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import Log from "../../common/log/Log";

const UserManager = () => {
  const { getUsers } = useContext(OrganizationContext);

  return <Log logs={getUsers()} />;
};

export default UserManager;
