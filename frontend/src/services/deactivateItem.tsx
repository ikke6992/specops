import { del } from "./api-client";

const deactivateItem = async (dataType: string, id: string) => {
  try {
    const response = await del(`${dataType}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deactivateItem;
