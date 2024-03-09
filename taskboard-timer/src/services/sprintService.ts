import apiClient from "./apiService";

export interface SprintCreationData {
    project_id: number;
    name: string;
    total_hours: number;
    completed_hours: number;
}

type RequestMethod = "POST" | "PUT" | "DELETE";

const handleSprintRequest = async (
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

const addSprint = async (sprintData: SprintCreationData) => {
    handleSprintRequest("/api/add_sprint", "POST", sprintData);
};

export { addSprint };
