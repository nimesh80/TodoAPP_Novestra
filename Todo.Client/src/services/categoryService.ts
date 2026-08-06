import api from "../api/axios";
import type { Category } from "../model/Category";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/Category");
    return response.data;
};