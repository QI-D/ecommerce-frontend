import axios from "axios";
import { 
    BASE_URL,
    USER_REGISTER_API,
    USER_LOGIN_API,
    USER_INFO_API
} from "../../utils/constants";

const registerUser = async (registration) => {
    const response = await axios.post(`${BASE_URL}${USER_REGISTER_API}`, registration);
    return response.data;
};

const loginUser = async (loginDetails) => {
    const response = await axios.post(`${BASE_URL}${USER_LOGIN_API}`, loginDetails);
    return response.data;
};

const getLoggedInUserInfo = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}${USER_INFO_API}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const isAdmin = () => {
    return localStorage.getItem('role') === 'ADMIN';
};

export {
    registerUser,
    loginUser,
    getLoggedInUserInfo,
    logout,
    isAuthenticated,
    isAdmin
};
