import axios from "axios";

const api = "http://localhost:8080";

export const post = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  return axios.post(`${api}/${resource}`, { ...body }, { headers });
};

export const del = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  return axios.delete(`${api}/${resource}`, { headers });
};

export const put = (resource: string, body: object) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  return axios.put(`${api}/${resource}`, { ...body }, { headers });
};

export const patch = (resource: string, body?: object) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  return axios.patch(`${api}/${resource}`, { ...body }, { headers });
};

export const get = (resource: string) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  return axios.get(`${api}/${resource}`, { headers });
};

export const isUser = () =>
  sessionStorage.getItem("roles")?.includes("ROLE_USER") || false;
export const isManager = () =>
  sessionStorage.getItem("roles")?.includes("ROLE_MANAGER") || false;
export const isAdmin = () =>
  sessionStorage.getItem("roles")?.includes("ROLE_ADMIN") || false;
export const isLoggedIn = () => sessionStorage.getItem("loggedIn") !== null;

export const connect = async (
  type: "login" | "signup",
  body: {
    username: string;
    password: string;
  },
  requestId?: string
) => {
  console.log(`${api}/users/${type}${requestId ? `/${requestId}` : ""}`);
  const response = await axios.post(
    `${api}/users/${type}${requestId ? `/${requestId}` : ""}`,
    { ...body }
  );
  const data: {
    username: string;
    token: string;
    roles: string;
  } = response.data;

  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("roles", data.roles);
  sessionStorage.setItem("loggedIn", "");

  return data;
};
