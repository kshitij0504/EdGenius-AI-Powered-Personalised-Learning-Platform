import { axiosInstance } from "./axiosConfig";
import toast from "react-hot-toast";

async function deleteApi(path, parameters) {
    let response;
    try {
        response = await axiosInstance.delete(path, { ...parameters });
    } catch (err) {
        console.error(err);
        response = err;
    }
    return response;
}

export default deleteApi;