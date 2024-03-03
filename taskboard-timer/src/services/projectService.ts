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
    const formattedProjectData = formatProjectDates(projectData);

    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            ...(formattedProjectData &&
                (method === "POST" || method === "PUT") && {
                    data: formattedProjectData,
                }),
        };

        const response = await apiClient(endpoint, options);

        console.log("Server response:", response.data.message);
        return response.data;
    } catch (error) {
        console.error(`Error handling project request (${method}):`, error);
    }
};

const formatProjectDates = (projectData: any = null) => {
    if (!projectData) {
        return null;
    }

    // Check if the projectData contains the dates we want to format
    const startDate = projectData.start_date
        ? new Date(projectData.start_date)
        : null;
    const endDate = projectData.end_date
        ? new Date(projectData.end_date)
        : null;

    // Format dates as ISO strings, ensuring UTC
    const formattedProjectData = {
        ...projectData,
        ...(startDate && { start_date: startDate.toISOString() }),
        ...(endDate && { end_date: endDate.toISOString() }),
    };

    return formattedProjectData;
};

const addProject = async (projectData: ProjectCreationData) => {
    handleProjectRequest("/api/add_project", "POST", projectData);
};

const deleteProject = async (project: Project) => {
    handleProjectRequest(`/api/project/${project.id}`, "DELETE");
};

const editProject = async (
    project: Project,
    projectData: ProjectCreationData
) => {
    handleProjectRequest(`/api/project/${project.id}`, "PUT", projectData);
};

export { addProject, deleteProject, editProject };
