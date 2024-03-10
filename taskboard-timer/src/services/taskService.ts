import { Task } from "../hooks/useTasks";
import handleRequest from "./requestService";

export interface TaskCreationData {
    project_id: number;
    name: string;
    estimated_hours: number;
    hours_worked: number;
}

const addTask = async (taskData: TaskCreationData) => {
    const responseData = handleRequest("/api/add_task", "POST", taskData);
    return responseData;
};

const deleteTask = async (task: Task) => {
    const responseData = handleRequest(`/api/task/${task.id}`, "DELETE");
    return responseData;
};

const editTask = async (task: Task, newTaskData: TaskCreationData) => {
    const responseData = handleRequest(
        `/api/task/${task.id}`,
        "PUT",
        newTaskData
    );
    return responseData;
};

export { addTask, deleteTask, editTask };
