import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:8080/",
  /*params: {
    key: "",
  },*/
});

export default api;
