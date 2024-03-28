import useData from "./useData";
import { Task } from "./useTasks";

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

const useSprintTasks = (sprintTaskQuery?: SprintTaskQuery) => {
    const endpoint = "api/tasks_in_sprint";
    const { data, isLoading, message, status } = useData<SprintTask>(
        endpoint,
        {
            params: {
                sprint_id: sprintTaskQuery?.sprint_id,
            },
        },
        [sprintTaskQuery]
    );

    return { data, isLoading, message, status };
};

export default useSprintTasks;
