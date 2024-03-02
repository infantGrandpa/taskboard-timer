import { Project } from "../hooks/useProjects";
import apiClient from "./apiService";

export interface ProjectCreationData {
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

type RequestMethod = "POST" | "PUT" | "DELETE";

const handleProjectRequest = async (
    endpoint: string,
    method: RequestMethod,
    projectData: any = null
) => {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(projectData &&
                (method === "POST" || method === "PUT") && {
                    data: projectData,
                }),
        };

        const response = await apiClient(endpoint, options);

        console.log("Server response:", response.data.message);
        return response.data;
    } catch (error) {
        console.error(`Error handling project request (${method}):`, error);
    }
};

const addProject = async (projectData: ProjectCreationData) => {
    handleProjectRequest("/api/add_project", "POST", projectData);
};

const deleteProject = async (project: Project) => {
    handleProjectRequest(`/api/project/${project.id}`, "DELETE");
};

export { addProject, deleteProject };
