import axios from "axios";
import { AXIOS_CLIENT } from "../constants/constant";
const axiosClient = axios.create({
  baseURL: "http://localhost:8084",
  headers: {
    "Content-Type": AXIOS_CLIENT.CONTENT_TYPE,
  },
});
export default axiosClient;
