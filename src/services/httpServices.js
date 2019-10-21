import axios from 'axios';
import logger from "./logService";
import { toast } from "react-toastify";



axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpect error occured");
    }

    return Promise.reject(error); //either way , we need to return it
});

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}