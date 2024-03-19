import useData from "./useData";

export interface Project {
    id: number;
    name: string;
    description: string;
    client: string;
    start_date: Date | null;
    end_date: Date | null;
}

export interface ProjectQuery {
    id: number | null | undefined;
}

const useProjects = (projectQuery?: ProjectQuery) => {
    const endpoint = "api/projects";
    const { data, isLoading, message, status } = useData<Project>(
        endpoint,
        {
            params: {
                id: projectQuery?.id,
            },
        },
        [projectQuery]
    );

    return { data, isLoading, message, status };
};

export default useProjects;
