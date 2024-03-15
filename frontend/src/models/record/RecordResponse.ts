import RecordStatus from "./RecordStatus";

export default interface RecordResponse {
  id: string;
  status: RecordStatus;
  name: string;
  executionDate: string;
  deadline: string;
  assignee: string;
}
