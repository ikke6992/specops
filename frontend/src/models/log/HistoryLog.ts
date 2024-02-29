type HistoryStatus = "on time" | "too late";

export default interface HistoryLog {
  id: string;
  status: HistoryStatus;
  name: string;
  executionDate: string;
  deadline: string;
  assignee: string;
}
