import { put } from "./api-client";

const putItem = async (dataType: string, body: object) => {
  try {
    const response = await put(`${dataType}`, {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default putItem;
