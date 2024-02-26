import api from "./api-client";

const getAllTasks = async () => {
  try {
    const response = await api.get("http://localhost:8080/tasks");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllTasks;
