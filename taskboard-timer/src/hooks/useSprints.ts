import useData from "./useData";

export interface Sprint {
    id: number;
    project_id: number;
    name: string;
    total_hours: number;
    completed_hours: number;
    start_date: Date | null;
    end_date: Date | null;
}

export interface SprintQuery {
    id: number | null | undefined;
    project_id: number | null | undefined;
}

const useSprints = (sprintQuery?: SprintQuery) => {
    const endpoint = "api/sprints";
    const { data, isLoading, error } = useData<Sprint>(
        endpoint,
        {
            params: {
                id: sprintQuery?.id,
                project_id: sprintQuery?.project_id,
            },
        },
        [sprintQuery]
    );

    return { data, isLoading, error };
};

export default useSprints;
