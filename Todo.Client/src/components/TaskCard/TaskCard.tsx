import type { Task } from "../../model/Task";

type TaskCardProps = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
};

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {

    const priorityColor = () => {
        switch (task.priority.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-700";
            case "medium":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-green-100 text-green-700";
        }
    };

    const statusColor = () => {
        switch (task.status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Header */}
            <div className="border-b p-5">

                <h2 className="text-xl font-bold text-gray-800">
                    {task.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {task.description || "No description"}
                </p>

            </div>

            {/* Body */}
            <div className="space-y-4 p-5">

                <div className="flex flex-wrap gap-2">

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                        {task.categoryName}
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-sm ${priorityColor()}`}
                    >
                        {task.priority}
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-sm ${statusColor()}`}
                    >
                        {task.status}
                    </span>

                </div>

                <div className="space-y-2 text-sm text-gray-600">

                    <div>
                        <strong>Created:</strong>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                    </div>

                    <div>
                        <strong>Due Date:</strong>{" "}
                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No Due Date"}
                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-5">

                <button
                    onClick={() => onEdit(task)}
                    className="rounded-lg border border-blue-500 px-4 py-2 text-blue-600 transition hover:bg-blue-500 hover:text-white"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task.taskId)}
                    className="rounded-lg border border-red-500 px-4 py-2 text-red-600 transition hover:bg-red-500 hover:text-white"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TaskCard;