import api from "./api-client";

const getAllUsers = async () => {
  try {
    const response = await api.get("http://localhost:8080/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllUsers;
