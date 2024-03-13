import handleRequest from "./requestService";
import { Task } from "../hooks/useTasks";

export interface SprintCreationData {
    project_id: number;
    name: string;
    total_hours: number;
    completed_hours: number;
    start_date: Date | null;
    end_date: Date | null;
}

const addSprint = async (sprintData: SprintCreationData) => {
    const responseData = handleRequest("/api/add_sprint", "POST", sprintData);
    console.log("RESPONSE DATA");
    console.log(responseData);
    return responseData;
};

const addTasksToSprint = async (sprintId: number, taskInfo: Task[]) => {
    console.log("ADDING TASKS TO SPRINT");
    console.log(sprintId);
    console.log(taskInfo);
};

export { addSprint, addTasksToSprint };
