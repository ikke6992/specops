import { patch } from "./api-client";

const activateItem = async (dataType: string, id: string) => {
  console.log(id);
  try {
    const response = await patch(`${dataType}/activate/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default activateItem;
