import { Project } from "../hooks/useProjects";

export interface ProjectCreationData {
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

const addProject = async (projectData: ProjectCreationData) => {
    handleProjectRequest("/api/add_project", "POST", projectData);
};

const deleteProject = async (project: Project) => {
    handleProjectRequest(`/api/project/${project.id}`, "DELETE");
};

const handleProjectRequest = async (
    endpoint: string,
    method: string,
    projectData: any = null
) => {
    const options: {
        method: string;
        headers: { "Content-Type": string };
        body?: string;
    } = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Only add the body for methods that require it
    if (projectData && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(projectData);
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:5000${endpoint}`,
            options
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Server response:", responseData.message);
        return responseData; // In case you need the response data
    } catch (error) {
        console.error(`Error handling project request (${method}):`, error);
    }
};

export { addProject, deleteProject };
