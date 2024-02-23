import axios from "axios";

const postItem = async (dataType: string, body: object) => {
  try {
    const response = await axios.post(`http://localhost:8080/${dataType}`, {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postItem;
