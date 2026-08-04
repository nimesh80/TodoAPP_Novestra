import api from "../api/axios";
import type { Task } from "../model/Task";

export const getTasks = async (): Promise<Task[]> => {
	const response = await api.get<Task[]>("/Task");
	return response.data;
};