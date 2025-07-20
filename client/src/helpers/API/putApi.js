import { axiosInstance } from "./axiosConfig";
import toast from "react-hot-toast";

async function putApi(path, data, parameters = {}) {
    let response;
    try {
        response = await axiosInstance.put(path, data, { ...parameters });
    } catch (err) {
        console.error(err);
        response = err;
    }
    return response;
}

export default putApi;