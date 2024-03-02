import useData from "./useData";

export interface Project {
    id: number;
    name: string;
    description: string;
    client: string;
    start_date: Date;
    end_date: Date;
}

export interface ProjectQuery {
    id: number | null | undefined;
}

const useProjects = (projectQuery?: ProjectQuery) => {
    const endpoint = "api/projects";
    const { data, isLoading, error, refetch } = useData<Project>(
        endpoint,
        {
            params: {
                id: projectQuery?.id,
            },
        },
        [projectQuery]
    );

    return { data, isLoading, error, refetch };
};

export default useProjects;
