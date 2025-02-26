import axios from "axios";
import {
    BASE_URL,
    CREATE_CATEGORY_API,
    GET_ALL_CATEGORY_API,
    GET_CATEGORY_BY_ID_API,
    DELETE_CATEGORY_API
} from "../../utils/constants";
import { getHeaders } from "./ApiService";

const createCategory = async (category) => {
    const response = await axios.post(`${BASE_URL}${CREATE_CATEGORY_API}`, category, {
        headers: getHeaders()
    });
    return response.data;
};

const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}${GET_ALL_CATEGORY_API}`);
    return response.data;
};

const getCategoryById = async (categoryId) => {
    const response = await axios.get(`${BASE_URL}${GET_CATEGORY_BY_ID_API}/${categoryId}`);
    return response.data;
};

const deleteCategory = async (categoryId) => {
    const response = await axios.delete(`${BASE_URL}${DELETE_CATEGORY_API}/${categoryId}`, {
        headers: getHeaders()
    });
    return response.data;
};

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory
};
