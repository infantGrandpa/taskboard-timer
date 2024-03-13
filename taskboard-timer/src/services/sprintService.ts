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
    id: number;
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
        sprintId: sprintId,
        taskIds: taskInfo,
    };

    console.log("ADDING TASKS TO SPRINT");
    console.log(sprintTaskData);
};

export { addSprint, addTasksToSprint };
