import UserLog from '../../models/log/UserLog';
import DepartmentLog from '../../models/log/DepartmentLog';

type Props = {
  users: UserLog[];
  departments: DepartmentLog[];
}

const ManagementDashboard = ({users, departments}: Props) => {
  return (
    <table className="table-auto min-w-fit w-full bg-white rounded-md shadow-lg">
      <thead>
        {users
          .map((user) => (
            <LogHead key={i} firstLog={log} />
          ))}
      </thead>
    </table>
      <tbody>
        {departments.map((department) => (
          <LogData key={log.id} log={log} />
        ))}
      </tbody>
  )
}

export default ManagementDashboard