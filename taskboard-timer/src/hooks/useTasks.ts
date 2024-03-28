import { Task, TaskQuery } from "../constants/tasks";
import useData from "./useData";

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
