import { ReactNode, createContext, useContext, useState } from "react";
import useProjects, { Project, ProjectQuery } from "../hooks/useProjects";

interface ProjectContentType {
    data: Project[] | null;
    isLoading: boolean;
    error: string | undefined;
    projectQuery?: ProjectQuery;
    setProjectQuery: (query: ProjectQuery) => void;
}

const ProjectContext = createContext<ProjectContentType>({
    data: null,
    isLoading: false,
    error: undefined,
    projectQuery: undefined,
    setProjectQuery: () => void 0,
});

interface Props {
    children: ReactNode;
}

const ProjectProvider = ({ children }: Props) => {
    const [projectQuery, setProjectQuery] = useState<ProjectQuery>(
        {} as ProjectQuery
    );

    const { data, isLoading, error } = useProjects(projectQuery);

    return (
        <ProjectContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                error: error,
                projectQuery: projectQuery,
                setProjectQuery: setProjectQuery,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

function useProjectContext() {
    return useContext(ProjectContext);
}

export { ProjectProvider, useProjectContext };
