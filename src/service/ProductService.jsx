import axios from "axios";
import {
    BASE_URL,
    CREATE_PRODUCT_API,
    UPDATE_PRODUCT_API,
    GET_ALL_PRODUCT_API,
    SEARCH_PRODUCT_API,
    GET_PRODUCT_BY_CATEGORY_API,
    GET_PRODUCT_BY_ID_API,
    DELETE_PRODUCT_API
} from "../../utils/constants";
import { getHeaders } from "../../utils/httpUtils";

const createProduct = async (formData) => {
    const response = await axios.post(`${BASE_URL}${CREATE_PRODUCT_API}`, formData, {
        headers: {
            ...getHeaders(),
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const updateProduct = async (productId, formData) => {
    const response = await axios.put(`${BASE_URL}${UPDATE_PRODUCT_API}/${productId}`, formData, {
        headers: {
            ...getHeaders(),
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const getAllProducts = async () => {
    const response = await axios.get(`${BASE_URL}${GET_ALL_PRODUCT_API}`);
    return response.data;
};

const searchProducts = async (searchValue) => {
    const response = await axios.get(`${BASE_URL}${SEARCH_PRODUCT_API}`, {
        params: { searchValue }
    });
    return response.data;
};

const getProductsByCategory = async (categoryId) => {
    const response = await axios.get(`${BASE_URL}${GET_PRODUCT_BY_CATEGORY_API}/${categoryId}`);
    return response.data;
};

const getProductById = async (productId) => {
    const response = await axios.get(`${BASE_URL}${GET_PRODUCT_BY_ID_API}/${productId}`);
    return response.data;
};

const deleteProduct = async (productId) => {
    const response = await axios.delete(`${BASE_URL}${DELETE_PRODUCT_API}/${productId}`, {
        headers: getHeaders()
    });
    return response.data;
};

export { 
    createProduct,
    updateProduct,
    getAllProducts,
    searchProducts,
    getProductsByCategory,
    getProductById,
    deleteProduct
};
