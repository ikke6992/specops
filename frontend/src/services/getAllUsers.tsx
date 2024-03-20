import { get } from "./api-client";

const getAllUsers = async () => {
  try {
    const response = await get("users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllUsers;
