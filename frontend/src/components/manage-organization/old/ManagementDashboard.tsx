import UserLog from "../../../models/log/UserLog";
import DepartmentLog from "../../../models/log/DepartmentLog";

type Props = {
  users: UserLog[];
  departments: DepartmentLog[];
};

const ManagementDashboard = ({ users, departments }: Props) => {
  return <></>;
};

export default ManagementDashboard;
