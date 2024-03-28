import { SprintTask, SprintTaskQuery } from "../constants/sprintTasks";
import useData from "./useData";

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
