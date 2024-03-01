import HistoryLog from "../models/log/HistoryLog";
import RecordResponse from "../models/record/RecordResponse";
import api from "./api-client";

const getAllRecords = async () => {
  try {
    const response = await api.get("http://localhost:8080/tasks/history");
    const data: RecordResponse[] = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllRecords;
