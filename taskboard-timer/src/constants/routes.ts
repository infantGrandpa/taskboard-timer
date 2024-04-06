const routes = {
    home: () => `/`,
    newProject: () => `/new-project`,
    project: (projectId: any) => `/projects/${projectId}`,
    newTasks: (projectId: any) => `/projects/${projectId}/new-tasks`,
    newSprint: (projectId: any) => `/projects/${projectId}/new-sprint`,
    editSprint: (projectId: any, sprintId: any) =>
        `/projects/${projectId}/sprints/${sprintId}/edit`,
    prioritizeTasks: (projectId: any, sprintId: any) =>
        `/projects/${projectId}/sprints/${sprintId}/prioritize`,
};

export default routes;
