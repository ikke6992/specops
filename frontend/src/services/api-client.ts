import axios from "axios";

const api = "http://localhost:8080";

export const post = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("thokenu")}`,
  };
  return axios.post(`${api}/${resource}`, { ...body }, { headers });
};

export const del = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("thokenu")}`,
  };
  return axios.delete(`${api}/${resource}`, { headers });
};

export const put = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("thokenu")}`,
  };
  return axios.put(`${api}/${resource}`, { ...body }, { headers });
};

export const patch = (resource: string, body?: object) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("thokenu")}`,
  };
  return axios.patch(`${api}/${resource}`, { ...body }, { headers });
};

export const get = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("thokenu")}`,
  };
  return axios.get(`${api}/${resource}`, { headers });
};

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
  } = response.data;

  localStorage.setItem("thokenu", data.token);

  return data;
};
