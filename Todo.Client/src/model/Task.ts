export interface Task {

    taskId: string;
    title: string;
    description ?: string;
    categoryName: string;
    priority: string;
    status: string;
    dueDate ?: string;
    createdAt: string;
    completedAt ?: string;
}

