import useData from "./useData";

export interface Project {
    id: number;
    name: string;
    description: string;
    client: string;
    start_date: Date;
    end_date: Date;
}

const useProjects = () => {
    const endpoint = "api/projects";
    const { data, isLoading, error, refetch } = useData<Project[]>({
        endpoint,
    });

    return { data, isLoading, error, refetch };
};

export default useProjects;
