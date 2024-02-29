import StatusType from "./StatusType";

export default interface RecordResponse {
  id: number;
  status: StatusType;
  name: string;
  executionDate: Date;
  deadline: Date;
  assignee: string;
}
