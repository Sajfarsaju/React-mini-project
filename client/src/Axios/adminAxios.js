import axios from "axios";
import { adminAPI } from "../Constants/API";

const adminInstance = axios.create({
    baseURL: adminAPI,
});
export default adminInstance;
