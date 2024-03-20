import TaskResponse from "../models/task/TaskResponse";
import { get } from "./api-client";
const getAllTasks = async () => {
  try {
    const response = await get("tasks");
    const data: TaskResponse[] = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllTasks;
