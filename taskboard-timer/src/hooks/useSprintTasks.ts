import useData from "./useData";
import { Task } from "./useTasks";

export interface SprintTask {
    task_id: number;
    sprint_id: number;
    priority: string;
    status: string;
    task_details: Task;
}

export interface SprintTaskQuery {
    sprint_id: number | null | undefined;
}

const useSprintTasks = (sprintTaskQuery?: SprintTaskQuery) => {
    console.log("USE SPRINT TASKS QUERY");
    console.log(sprintTaskQuery);

    const endpoint = "api/tasks_in_sprint";
    const { data, isLoading, error } = useData<SprintTask>(
        endpoint,
        {
            params: {
                sprint_id: sprintTaskQuery?.sprint_id,
            },
        },
        [sprintTaskQuery]
    );

    return { data, isLoading, error };
};

export default useSprintTasks;
