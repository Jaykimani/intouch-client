import axios from "axios";

export const axiosInstance = axios.create({
    baseURL = "https://intouch-social-app.herokuapp.com/api/"
});

