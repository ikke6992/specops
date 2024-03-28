import { post } from "./api-client";

const postItem = async (dataType: string, body: object) => {
  console.log(body);
  try {
    const response = await post(`${dataType}`, {
      ...body,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default postItem;
