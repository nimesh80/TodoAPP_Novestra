import api from "../api/axios";

import type { Task } from "../model/Task";
import type { CreateTaskRequest } from "../model/CreateTaskRequest";
import type { UpdateTaskRequest } from "../model/UpdateTaskRequest";

export const getTasks = async (
    token: string
): Promise<Task[]> => {

    const response = await api.get("/Task", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const createTask = async (
    request: CreateTaskRequest,
    token: string
) => {

    const response = await api.post(
        "/Task",
        request,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateTask = async (
    id: string,
    request: UpdateTaskRequest,
    token: string
) => {

    const response = await api.put(
        `/Task/${id}`,
        request,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteTask = async (
    id: string,
    token: string
) => {

    const response = await api.delete(
        `/Task/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};