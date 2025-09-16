export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dilwjdy6s"
export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER :"/register",
    UPLOAD_IMAGE : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    CURRENT_PROFILE :"/profile",
    Fetch_ALL_CATEGORY:"/categories/get",
    ADD_CATEGORY: "/categories/save",
    UPDATE_CATEGORY: `/categories`,
    FETCH_ALL_INCOME: "/incomes",
    ADD_INCOME : "/incomes/add",
    FETCH_CATEGORY_BY_Income:`/categories/income`,
    DELETE_INCOME: "/incomes",
    TOTAL_INCOME : "incomes/totalIncome",
    TOTAL_EXPENSE : "/expenses/totalExpense",
    DASHBOARD_DATA : "/dashboard",
    FETCH_ALL_EXPENSE : "/expenses",
    FETCH_CATEGORY_BY_EXPENSE:`/categories/expense`,
    DELETE_EXPENSE : "/expenses",
    ADD_EXPENSE : "/expenses/add",
    FILTER_EXPENSES : "/expenses/filter",
    FILTER_INCOME: "/incomes/filter"
}
