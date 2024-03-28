import { Task } from "./tasks";

export interface SprintTask {
    task_id: number;
    sprint_id: number;
    priority: "WONT_HAVE" | "COULD_HAVE" | "SHOULD_HAVE" | "MUST_HAVE";
    status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETE";
    task_details: Task;
}

export interface SprintTaskQuery {
    sprint_id: number | null | undefined;
}

export interface SprintTaskData {
    task_id: number;
}
