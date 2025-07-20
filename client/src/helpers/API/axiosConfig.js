import axios from "axios";
import toast from "react-hot-toast";
import apiInfo from "./apiInfo";

const axiosInstance = axios.create({
    baseURL: apiInfo.URL, 
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    },
});

axios.defaults.debug = false;

const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.request.use(config => {
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            toast.dismiss(); 
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error("Session expired. Please log in again.");
                        navigate("/");
                        break;
                    case 403:
                        toast.error("You do not have permission to access this resource.");
                        break;
                    case 500:
                        toast.error("Server error. Please try again later.");
                        break;
                    default:
                        toast.error(error.response.data.message || "An error occurred.");
                }
            } else {
                toast.error("Network error. Please check your connection.");
            }
            return Promise.reject(error);
        }
    );
};

export { axiosInstance, setupAxiosInterceptors };