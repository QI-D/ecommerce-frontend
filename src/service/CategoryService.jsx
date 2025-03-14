import axios from "axios";
import {
    BASE_URL,
    CREATE_CATEGORY_API,
    GET_ALL_CATEGORY_API,
    GET_CATEGORY_BY_ID_API,
    UPDATE_CATEGORY_API,
    DELETE_CATEGORY_API
} from "../utils/constants";
import { getHeaders } from "../utils/httpUtils";

const createCategory = async (category) => {
    const response = await axios.post(`${BASE_URL}${CREATE_CATEGORY_API}`, category, {
        headers: getHeaders()
    });
    return response.data;
};

const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}${GET_ALL_CATEGORY_API}`);

    const sortedCategories = response.data.categoryList.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return {
        ...response.data,
        categoryList: sortedCategories
    };
};

const getCategoryById = async (categoryId) => {
    const response = await axios.get(`${BASE_URL}${GET_CATEGORY_BY_ID_API}/${categoryId}`);
    return response.data;
};

const updateCategory = async (categoryId, body) => {
    const response = await axios.put(`${BASE_URL}${UPDATE_CATEGORY_API}/${categoryId}`, body, {
        headers: getHeaders()
    });
    return response.data;
}

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
    updateCategory,
    deleteCategory
};
