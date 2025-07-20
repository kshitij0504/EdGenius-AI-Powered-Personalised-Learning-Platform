import { axiosInstance } from "./axiosConfig";
import toast from "react-hot-toast";

async function postApi(path, body) {
    let response;
    try {
        response = await axiosInstance.post(path, body);
    } catch (err) {
        console.error(err);
        response = err;
    }
    return response;
}

export default postApi;