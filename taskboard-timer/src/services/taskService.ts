import apiClient from "./apiService";

export interface TaskCreationData {
    project_id: number;
    name: string;
    estimated_hours: number;
    hours_worked: number;
}

type RequestMethod = "POST" | "PUT" | "DELETE";

const handleTaskRequest = async (
    endpoint: string,
    method: RequestMethod,
    taskData: any = null
) => {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(taskData &&
                (method === "POST" || method === "PUT") && {
                    data: taskData,
                }),
        };

        const response = await apiClient(endpoint, options);

        console.log("Server response:", response.data.message);
        return response.data;
    } catch (error) {
        console.error(`Error handling task request (${method}):`, error);
    }
};

const addTask = async (taskData: TaskCreationData) => {
    handleTaskRequest("/api/add_task", "POST", taskData);
};

export { addTask };
