export interface CreateTaskRequest {
    title: string;
    description: string;
    categoryId: string;
    priority: number;
    dueDate: string;
}