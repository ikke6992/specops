import axios from "axios";
import TaskResponse from "../models/task/TaskResponse";

const updateTask = async (dataType: string, id: string) => {
  console.log(id);
  try {
    const response = await axios.patch(
      `http://localhost:8080/${dataType}/setComplete/${id}`
    );
    const data: TaskResponse = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateTask;
