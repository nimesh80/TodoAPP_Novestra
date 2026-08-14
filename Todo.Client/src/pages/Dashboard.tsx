import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import NewTaskButton from "../components/NewTask/NewTaskButton";
import TaskCard from "../components/TaskCard/TaskCard";
import TaskModal from "../components/TaskModal/TaskModal";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskService";

import { getCategories } from "../services/categoryService";

import type { Task } from "../model/Task";
import type { Category } from "../model/Category";
import type { CreateTaskRequest } from "../model/CreateTaskRequest";
import type { UpdateTaskRequest } from "../model/UpdateTaskRequest";

function Dashboard() {

    const { getAccessTokenSilently } = useAuth0();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [filters, setFilters] = useState({
        search: "",
        category: "",
        status: "",
        priority: "",
    });

    const getToken = async () => {

        return await getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
        });

    };

const loadTasks = async () => {
    try {
        const token = await getToken();

        const data = await getTasks(token);

        setTasks(data);
    }
    catch (error) {
        console.error(error);
    }
};

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        }
        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        const initialize = async () => {

            await Promise.all([
                loadTasks(),
                loadCategories()
            ]);

        };

        initialize();

    }, []);

    const handleSaveTask = async (
        task: CreateTaskRequest | UpdateTaskRequest
    ) => {

        try {

            const token = await getToken();

            if (selectedTask) {

                const updateRequest: UpdateTaskRequest = {

                    title: task.title,
                    description: task.description,
                    categoryId: task.categoryId,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    status: (task as UpdateTaskRequest).status

                };

                await updateTask(
                    selectedTask.taskId,
                    updateRequest,
                    token
                );

                toast.success("Task updated successfully.");

            }
            else {

                await createTask(
                    task as CreateTaskRequest,
                    token
                );

                toast.success("Task created successfully.");

            }

            await loadTasks();

            setSelectedTask(null);
            setIsModalOpen(false);

        }
        catch (error) {

            console.error(error);

            toast.error("Failed to save task.");

        }

    };

    const handleDeleteTask = async (
        id: string
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {

            const token = await getToken();

            await deleteTask(id, token);

            await loadTasks();

            toast.success("Task deleted successfully.");

        }
        catch (error) {

            console.error(error);

            toast.error("Failed to delete task.");

        }

    };

    const filteredTasks = useMemo(() => {

        return [...tasks]

            .filter(task => {

                const matchesSearch =
                    task.title
                        .toLowerCase()
                        .includes(filters.search.toLowerCase());

                const matchesCategory =
                    !filters.category ||
                    task.categoryName === filters.category;

                const matchesStatus =
                    !filters.status ||
                    task.status === filters.status;

                const matchesPriority =
                    !filters.priority ||
                    task.priority === filters.priority;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus &&
                    matchesPriority
                );

            })

            .sort((a, b) => {

                if (!a.dueDate) return 1;

                if (!b.dueDate) return -1;

                return (
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                );

            });

    }, [tasks, filters]);

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="mx-auto max-w-7xl p-6">

                <div className="mb-8 flex flex-col gap-4 lg:flex-row">

                    <div className="flex-1">

                        <Toolbar
                            filters={filters}
                            categories={categories}
                            onFilterChange={(field, value) =>
                                setFilters(prev => ({
                                    ...prev,
                                    [field]: value,
                                }))
                            }
                        />

                    </div>

                    <NewTaskButton
                        onClick={() => {

                            setSelectedTask(null);
                            setIsModalOpen(true);

                        }}
                    />

                </div>

                {filteredTasks.length === 0 ? (

                    <div className="rounded-xl bg-white p-8 text-center shadow">

                        <h2 className="text-xl font-semibold">
                            No Tasks Found
                        </h2>

                    </div>

                ) : (

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                        {filteredTasks.map(task => (

                            <TaskCard
                                key={task.taskId}
                                task={task}
                                onEdit={(task) => {

                                    setSelectedTask(task);
                                    setIsModalOpen(true);

                                }}
                                onDelete={handleDeleteTask}
                            />

                        ))}

                    </div>

                )}

            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {

                    setSelectedTask(null);
                    setIsModalOpen(false);

                }}
                categories={categories}
                selectedTask={selectedTask}
                onSave={handleSaveTask}
            />

        </div>

    );

}

export default Dashboard;