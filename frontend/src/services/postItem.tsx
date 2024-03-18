import { post } from "./api-client";

const postItem = async (dataType: string, body: object) => {
  try {
    const response = await post(`${dataType}`, {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postItem;
