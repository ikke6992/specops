import TaskStatus from "../task/TaskStatus";

export default interface TaskLog {
  id: string;
  status: TaskStatus;
  name: string;
  timeframe: string;
  interval: string;
  department: string;
}
