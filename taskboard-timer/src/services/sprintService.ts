import { getPriorityEnumKey } from "../constants/priorityLabels";
import { SprintTaskData } from "../constants/sprintTasks";
import { Sprint, SprintCreationData } from "../constants/sprints";
import { getStatusEnumKey } from "../constants/statusLabels";
import handleRequest from "./requestService";

const addSprint = async (sprintData: SprintCreationData) => {
    const responseData = handleRequest("/api/add_sprint", "POST", sprintData);
    return responseData;
};

const deleteSprint = async (sprint: Sprint) => {
    const responseData = handleRequest(`/api/sprint/${sprint.id}`, "DELETE");
    return responseData;
};

const editSprint = async (
    sprint: Sprint,
    newSprintData: SprintCreationData
) => {
    const responseData = handleRequest(
        `/api/sprint/${sprint.id}`,
        "PUT",
        newSprintData
    );
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

const editSprintTask = async (
    sprintId: number,
    taskId: number,
    priority: string,
    status: string
) => {
    const updateData = {
        sprint_id: sprintId,
        task_id: taskId,
        priority: getPriorityEnumKey(priority),
        status: getStatusEnumKey(status),
    };

    const responseData = await handleRequest(
        "/api/edit_sprint_task",
        "POST",
        updateData
    );
    return responseData;
};

export {
    addSprint,
    deleteSprint,
    editSprint,
    addTasksToSprint,
    editSprintTask,
};
