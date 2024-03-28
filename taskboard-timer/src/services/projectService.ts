import { Project, ProjectCreationData } from "../constants/projects";
import handleRequest from "./requestService";

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
    const formattedProjectData = formatProjectDates(projectData);
    const responseData = handleRequest(
        "/api/add_project",
        "POST",
        formattedProjectData
    );
    return responseData;
};

const deleteProject = async (project: Project) => {
    const responseData = handleRequest(`/api/project/${project.id}`, "DELETE");
    return responseData;
};

const editProject = async (
    project: Project,
    projectData: ProjectCreationData
) => {
    const formattedProjectData = formatProjectDates(projectData);
    const responseData = handleRequest(
        `/api/project/${project.id}`,
        "PUT",
        formattedProjectData
    );
    return responseData;
};

export { addProject, deleteProject, editProject };
