import axios from "axios";
import { userAPI } from "../Constants/API";

const userInstance = axios.create({
    baseURL: userAPI,
});
export default userInstance;
