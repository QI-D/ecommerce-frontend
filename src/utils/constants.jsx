export const BASE_URL = 'http://localhost:8080';

// auth endpoints
export const USER_REGISTER_API = '/auth/register';
export const USER_LOGIN_API = '/auth/login';

// user endpoints
export const USER_INFO_API = '/user/my-info';

// category endpoints
export const CREATE_CATEGORY_API = '/category/create';
export const UPDATE_CATEGORY_API = '/category/update';
export const GET_ALL_CATEGORY_API = '/category/get-all';
export const GET_CATEGORY_BY_ID_API = '/category/get-category-by-id';
export const DELETE_CATEGORY_API = '/category/delete';

// product endpoints
export const CREATE_PRODUCT_API = '/product/create';
export const UPDATE_PRODUCT_API = '/product/update';
export const GET_ALL_PRODUCT_API = '/product/get-all';
export const SEARCH_PRODUCT_API = '/product/search';
export const GET_PRODUCT_BY_CATEGORY_API = '/product/get-by-category-id';
export const GET_PRODUCT_BY_ID_API = '/product/get-product-by-id';
export const DELETE_PRODUCT_API = '/product/delete';

// address endpoints
export const ADDRESS_API = '/address/save';

// order endpoints
export const CREATE_ORDER_API = '/order/create';
export const GET_ALL_ORDER_API = '/order/filter';
export const FILTER_ORDER_API = '/order/update-item-status';

export const ORDER_STATUS = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
