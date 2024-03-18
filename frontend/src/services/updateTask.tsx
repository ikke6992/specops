import TaskResponse from "../models/task/TaskResponse";
import { patch } from "./api-client";

const updateTask = async (dataType: string, id: string) => {
  try {
    const response = await patch(`${dataType}/setComplete/${id}`);
    const data: TaskResponse = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateTask;
