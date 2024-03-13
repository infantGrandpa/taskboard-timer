import handleRequest from "./requestService";

export interface SprintCreationData {
    project_id: number;
    name: string;
    total_hours: number;
    completed_hours: number;
    start_date: Date | null;
    end_date: Date | null;
}

export interface SprintTaskData {
    task_id: number;
}

const addSprint = async (sprintData: SprintCreationData) => {
    const responseData = handleRequest("/api/add_sprint", "POST", sprintData);
    return responseData;
};

const addTasksToSprint = async (
    sprintId: number,
    taskInfo: SprintTaskData[]
) => {
    const sprintTaskData = {
        sprint_id: sprintId,
        tasks_info: taskInfo,
    };

    const responseData = await handleRequest(
        "/api/add_tasks_to_sprint",
        "POST",
        sprintTaskData
    );
    return responseData;
};

export { addSprint, addTasksToSprint };
