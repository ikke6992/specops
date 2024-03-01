import RecordStatus from "../record/RecordStatus";
import TaskStatus from "../task/TaskStatus";

type StatusFilter = "all" | TaskStatus | RecordStatus;

export default StatusFilter;
