import { get } from "./api-client";

const getAllDepartments = async () => {
  try {
    const response = await get("departments");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllDepartments;
