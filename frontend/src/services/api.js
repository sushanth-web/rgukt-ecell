import axios from "axios";

const api = axios.create({
  baseURL: "https://working-ecell-2.onrender.com/api",
  withCredentials: false, // set true only if you use cookies/auth later
});

// Optional: request interceptor (for debugging / auth later)
api.interceptors.request.use(
  (config) => {
    // console.log("API Request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
