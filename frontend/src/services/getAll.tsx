import { get } from "./api-client";

const getAll = async (dataType: string) => {
  try {
    const response = await get(`${dataType}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAll;
