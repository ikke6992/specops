import RecordStatus from "../record/RecordStatus";

export default interface HistoryLog {
  id: string;
  status: RecordStatus;
  name: string;
  executionDate: string;
  deadline: string;
  assignee: string;
}
