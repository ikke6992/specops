export default interface RecordResponse {
  id: number;
  status: "Planned" | "Pending" | "Overdue" | "On time" | "Too late";
  name: string;
  executionDate: Date;
  deadline: Date;
  assignee: string;
}
