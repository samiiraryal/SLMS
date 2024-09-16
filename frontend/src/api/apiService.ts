import axios from "axios";
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

httpClient.interceptors.request.use(
  // @ts-ignore
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default httpClient;
