import axios from "axios";
import useLocalStorage from "../useLocalStorage";

const instance = axios.create();

instance.defaults.baseURL = "http://localhost:5001";
instance.defaults.withCredentials = true;
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /* check for 401 and redirect login */
    return Promise.reject(error);
  }
);

export default instance;
