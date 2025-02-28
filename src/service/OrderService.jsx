import axios from "axios";
import {
    BASE_URL,
    CREATE_ORDER_API,
    GET_ALL_ORDER_API,
    FILTER_ORDER_API
} from "../utils/constants";
import { getHeaders } from "../utils/httpUtils";

const createOrder = async (order) => {
    const response = await axios.post(`${BASE_URL}${CREATE_ORDER_API}`, order, {
        headers: getHeaders()
    });
    return response.data;
};

const getAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}${GET_ALL_ORDER_API}`, {
        headers: getHeaders()
    });
    return response.data;
};

const getOrdersById = async (itemId) => {
    const response = await axios.get(`${BASE_URL}${FILTER_ORDER_API}`, {
        headers: getHeaders(),
        params: { itemId }
    });
    return response.data;
};

const getOrderByStatus = async (status) => {
    const response = await axios.get(`${BASE_URL}${FILTER_ORDER_API}`, {
        headers: getHeaders(),
        params: { status }
    });
    return response.data;
};

const updateOrderStatus = async (orderItemId, status) => {
    const response = await axios.put(`${BASE_URL}${FILTER_ORDER_API}/${orderItemId}`, {
        headers: getHeaders(),
        params: { status }
    });
    return response.data;
};

export { 
    createOrder,
    getAllOrders,
    getOrdersById,
    getOrderByStatus,
    updateOrderStatus
};
