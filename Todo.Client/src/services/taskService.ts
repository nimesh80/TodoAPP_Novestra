import api from "../api/axios";

import type { Task } from "../model/Task";
import type { CreateTaskRequest } from "../model/CreateTaskRequest";
import type { UpdateTaskRequest } from "../model/UpdateTaskRequest";

export const getTasks = async (): Promise<Task[]> => {

    const response = await api.get("/Task");

    return response.data;

};

export const createTask = async (
    request: CreateTaskRequest
) => {

    const response = await api.post("/Task", request);

    return response.data;

};

export const updateTask = async (
    id: string,
    request: UpdateTaskRequest
) => {

    const response = await api.put(
        `/Task/${id}`,
        request
    );

    return response.data;

};

export const deleteTask = async (
    id: string
) => {

    const response = await api.delete(
        `/Task/${id}`
    );

    return response.data;

};