import useData from "./useData";

export interface Project {
    id: number;
    name: string;
}

const useProjects = () => {
    const endpoint = "api/projects";
    const { data, isLoading, error, refetch } = useData<Project[]>({
        endpoint,
    });

    return { data, isLoading, error, refetch };
};

export default useProjects;
