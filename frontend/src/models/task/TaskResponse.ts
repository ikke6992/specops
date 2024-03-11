import TaskStatus from "./TaskStatus";

// type Department = {
//   id: string;
//   name: string;
// };

export default interface TaskResponse {
  id: string;
  name: string;
  timeframe: string;
  interval: string;
  department: string;
  startDate: string;
  deadline: string;
  status: TaskStatus;
}
