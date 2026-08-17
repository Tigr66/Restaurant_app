import axios from "axios";

const BASE_URl: string = import.meta.env.VITE_FIREBASE_URL;

export const firebaseApi = axios.create({
    baseURL: BASE_URl,
});
