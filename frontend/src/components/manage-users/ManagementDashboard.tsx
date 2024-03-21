import React from 'react'
import { UserLog } from '../../models/log/UserLog';

interface Props = {
  users: UserLog[][];
  departments: DepartmentLog[];
}

const ManagementDashboard: React.FC<Props> = ({users, departments}) => {
  return (
    <div>ManagementDashboard</div>
  )
}

export default ManagementDashboard