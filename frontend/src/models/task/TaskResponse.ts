type Department = {
  id: string;
  name: string;
};

export default interface TaskResponse {
  id: string;
  name: string;
  department: Department;
  startDate: string;
  deadline: string;
  status: string;
}
