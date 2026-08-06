import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import NewTaskButton from "../components/NewTask/NewTaskButton";
import TaskCard from "../components/TaskCard/TaskCard";
import TaskModal from "../components/TaskModal/TaskModal";

import {
    getTasks,
    createTask,
} from "../services/taskService";

import { getCategories } from "../services/categoryService";

import type { Task } from "../model/Task";
import type { Category } from "../model/Category";
import type { CreateTaskRequest } from "../model/CreateTaskRequest";

function Dashboard() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        category: "",
        status: "",
        priority: "",
    });

    const loadTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

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

    const handleCreateTask = async (
        task: CreateTaskRequest
    ) => {

        try {

            await createTask(task);

            await loadTasks();

            setIsModalOpen(false);

        } catch (error) {

            console.error(error);

            alert("Failed to create task.");

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

            <Navbar userName="Test User" />

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
                        onClick={() =>
                            setIsModalOpen(true)
                        }
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
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />

                        ))}

                    </div>

                )}

            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() =>
                    setIsModalOpen(false)
                }
                categories={categories}
                onSave={handleCreateTask}
            />

        </div>

    );

}

export default Dashboard;