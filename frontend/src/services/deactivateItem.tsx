import { del } from "./api-client";

const deactivateItem = async (dataType: string, id: string) => {
  console.log(id);
  try {
    const response = await del(`${dataType}/delete/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deactivateItem;
