import axios from "axios";
import {
    BASE_URL,
    USER_INFO_API
} from "../../utils/constants";
import { getHeaders } from "./ApiService";

export const getLoggedInUserInfo = async () => {
    const response = await axios.get(`${BASE_URL}${USER_INFO_API}`, {
        headers: getHeaders()
    });
    return response.data;
};
