import axios from "axios";

const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllUsers;
