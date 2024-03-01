import RecordStatus from "./RecordStatus";

export default interface RecordResponse {
  id: number;
  status: RecordStatus;
  name: string;
  executionDate: Date;
  deadline: Date;
  assignee: string;
}
