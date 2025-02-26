import axios from "axios";
import { BASE_URL, ADDRESS_API } from "../../utils/constants";
import { getHeaders } from "./ApiService";

export const saveAddress = async (address) => {
    const response = await axios.post(`${BASE_URL}${ADDRESS_API}`, address, {
        headers: getHeaders()
    });
    return response.data;
};
