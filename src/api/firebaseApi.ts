import axios from "axios";

const BASE_URl: string = "https://project-1-3582b-default-rtdb.firebaseio.com/";

export const firebaseApi = axios.create({
    baseURL: BASE_URl,
});
