import axios from "axios";

const getAll = async (dataType: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/${dataType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAll;
