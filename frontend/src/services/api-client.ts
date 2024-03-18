import axios from "axios";

const api = "http://localhost:8080";

export const post = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return axios.post(`${api}/${resource}`, { ...body }, { headers });
};

export const del = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return axios.delete(`${api}/${resource}`, { headers });
};

export const put = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return axios.put(`${api}/${resource}`, { ...body }, { headers });
};

export const patch = (resource: string, body?: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return axios.patch(`${api}/${resource}`, { ...body }, { headers });
};

export const get = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return axios.get(`${api}/${resource}`, { headers });
};

export const isUser = () =>
  localStorage.getItem("roles")?.includes("ROLE_USER");
export const isManager = () =>
  localStorage.getItem("roles")?.includes("ROLE_MANAGER");
export const isAdmin = () =>
  localStorage.getItem("roles")?.includes("ROLE_ADMIN");

export const connect = async (
  type: "login" | "signup",
  body: {
    username: string;
    password: string;
  }
) => {
  const response = await axios.post(`${api}/users/${type}`, { ...body });
  const data: {
    username: string;
    token: string;
    roles: string;
  } = response.data;

  localStorage.setItem("token", data.token);
  localStorage.setItem("roles", data.roles);

  return data;
};
