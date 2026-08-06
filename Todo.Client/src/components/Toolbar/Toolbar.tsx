import type { Category } from "../../model/Category";

type ToolbarProps = {
    filters: {
        search: string;
        category: string;
        status: string;
        priority: string;
    };

    categories: Category[];

    onFilterChange: (
        field: "search" | "category" | "status" | "priority",
        value: string
    ) => void;
};

function Toolbar({
    filters,
    categories,
    onFilterChange,
}: ToolbarProps) {
    return (
        <div className="rounded-xl bg-white p-5 shadow">

            <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) =>
                    onFilterChange("search", e.target.value)
                }
                className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

            <div className="flex flex-wrap gap-3">

                <select
                    value={filters.category}
                    onChange={(e) =>
                        onFilterChange("category", e.target.value)
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option
                            key={category.categoryId}
                            value={category.categoryName}
                        >
                            {category.categoryName}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.status}
                    onChange={(e) =>
                        onFilterChange("status", e.target.value)
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={filters.priority}
                    onChange={(e) =>
                        onFilterChange("priority", e.target.value)
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2"
                >
                    <option value="">All Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

            </div>

        </div>
    );
}

export default Toolbar;