type Department = {
  id: string;
  name: string;
};

export default interface TaskResponse {
  taskId: string;
  taskPlanningId: string;
  name: string;
  department: Department;
  startDate: string;
  deadline: string;
  status: string;
}
