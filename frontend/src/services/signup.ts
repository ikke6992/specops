import axios from "axios";
import User from "../models/user/User";

const signup = async (body: User) => {
  try {
    const response = await axios.post(`http://localhost:8080/users/signup`, {
      ...body,
    });
    const data: {
      id: string;
      username: string;
    } = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default signup;
