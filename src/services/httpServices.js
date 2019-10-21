import axios from 'axios';



axios.interceptors.response.use(null, error => {
    const expectError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectError) {
        console.log("Loggin the error: ", error)
        alert("An unexpect error occured");
    }

    return Promise.reject(error); //either way , we need to return it
});

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}