import { Project } from "../hooks/useProjects";

export interface ProjectCreationData {
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

const addProject = async (projectData: ProjectCreationData) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/add_project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("Server response:", responseData.message);
    } catch (error) {
        console.error("Error adding new project:", error);
    }
};

const deleteProject = async (project: Project) => {
    try {
        const response = await fetch(
            `http://127.0.0.1:5000/api/project/${project.id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Server response:", responseData.message);
    } catch (error) {
        console.error("Error deleting project:", error);
    }
};

export { addProject, deleteProject };
