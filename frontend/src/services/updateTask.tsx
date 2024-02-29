import axios from "axios";

const updateTask = async (dataType: string, id: string) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/${dataType}/setComplete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateTask;
