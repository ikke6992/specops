import axios from "axios";

const deactivateItem = async (dataType: string, id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/${dataType}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deactivateItem;
