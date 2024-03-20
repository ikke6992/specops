import RecordResponse from "../models/record/RecordResponse";
import { get } from "./api-client";

const getAllRecords = async () => {
  try {
    const response = await get("tasks/history");
    const data: RecordResponse[] = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllRecords;
