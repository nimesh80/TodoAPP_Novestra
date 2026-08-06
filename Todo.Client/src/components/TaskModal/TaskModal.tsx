import { useState } from "react";

import type { Category } from "../../model/Category";
import type { CreateTaskRequest } from "../../model/CreateTaskRequest";

type TaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    onSave: (task: CreateTaskRequest) => Promise<void>;
};

const initialForm: CreateTaskRequest = {
    title: "",
    description: "",
    categoryId: "",
    priority: 1,
    dueDate: "",
};

function TaskModal({
    isOpen,
    onClose,
    categories,
    onSave,
}: TaskModalProps) {

    const [formData, setFormData] =
        useState<CreateTaskRequest>(initialForm);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                name === "priority"
                    ? Number(value)
                    : value,
        }));

    };

    const handleClose = () => {

        setFormData(initialForm);

        onClose();

    };

    const handleSave = async () => {

        if (!formData.title.trim()) {

            alert("Title is required.");

            return;

        }

        if (!formData.categoryId) {

            alert("Please select a category.");

            return;

        }

        await onSave(formData);

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-2xl font-bold">
                        Create Task
                    </h2>

                    <button
                        onClick={handleClose}
                        className="text-2xl text-gray-500 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                <div className="space-y-5 p-6">

                    <div>

                        <label className="mb-2 block font-medium">
                            Title
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3"
                        />

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">
                                Category
                            </label>

                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(category => (

                                    <option
                                        key={category.categoryId}
                                        value={category.categoryId}
                                    >
                                        {category.categoryName}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            >

                                <option value={0}>Low</option>

                                <option value={1}>Medium</option>

                                <option value={2}>High</option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">
                                Due Date
                            </label>

                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3"
                            />

                        </div>

                    </div>

                </div>

                <div className="flex justify-end gap-3 border-t p-6">

                    <button
                        onClick={handleClose}
                        className="rounded-lg border px-6 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                    >
                        Save Task
                    </button>

                </div>

            </div>

        </div>

    );

}

export default TaskModal;