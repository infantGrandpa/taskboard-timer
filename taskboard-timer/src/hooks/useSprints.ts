import { Sprint, SprintQuery } from "../constants/sprints";
import useData from "./useData";

const useSprints = (sprintQuery?: SprintQuery) => {
    const endpoint = "api/sprints";
    const { data, isLoading, message, status } = useData<Sprint>(
        endpoint,
        {
            params: {
                id: sprintQuery?.id,
                project_id: sprintQuery?.project_id,
            },
        },
        [sprintQuery]
    );

    return { data, isLoading, message, status };
};

export default useSprints;
