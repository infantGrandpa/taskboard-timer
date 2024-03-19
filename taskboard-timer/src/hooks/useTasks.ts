import useData from "./useData";

export interface Task {
    id: number;
    project_id: number;
    name: string;
    estimated_hours: number;
    hours_worked: number;
}

export interface TaskQuery {
    id: number | null | undefined;
    project_id: number | null | undefined;
}

const useTasks = (taskQuery?: TaskQuery) => {
    const endpoint = "api/tasks";
    const { data, isLoading, message, status } = useData<Task>(
        endpoint,
        {
            params: {
                id: taskQuery?.id,
                project_id: taskQuery?.project_id,
            },
        },
        [taskQuery]
    );

    return { data, isLoading, message, status };
};

export default useTasks;
