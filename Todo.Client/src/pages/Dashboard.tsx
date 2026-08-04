import { useEffect, useState } from "react";
import type { Task } from "../model/Task";
import { getTasks } from "../services/taskService";

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Todo Dashboard</h1>

            {tasks.map(task => (
                <div key={task.taskId}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.categoryName}</p>
                    <p>{task.priority}</p>
                    <p>{task.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;