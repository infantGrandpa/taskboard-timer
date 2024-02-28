import useData from "./useData";

export interface Project {
    id: number;
    name: string;
}

const useProjects = () => {
    const endpoint = "http://127.0.0.1:5000/api/projects";
    const { data, isLoading, error } = useData<Project[]>({ endpoint });

    return { data, isLoading, error };
};

export default useProjects;
