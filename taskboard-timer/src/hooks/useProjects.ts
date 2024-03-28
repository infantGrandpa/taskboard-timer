import { Project, ProjectQuery } from "../constants/projects";
import useData from "./useData";

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
