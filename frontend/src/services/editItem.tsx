import { patch } from "./api-client";

const editItem = async (dataType: string, id: string, body: object) => {
  try {
    const response = await patch(`${dataType}/edit/${id}`, { ...body });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default editItem;
