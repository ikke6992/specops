import axios from "axios";

const editItem = async (dataType: string, id: string, body: object) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/${dataType}/edit/${id}`,
      { ...body }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default editItem;
