import { ReactNode, createContext, useContext, useState } from "react";
import useProjects from "../hooks/useProjects";
import { Project, ProjectQuery } from "../constants/projects";

interface ProjectContentType {
    data: Project[] | null | Project;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    projectQuery?: ProjectQuery;
    setProjectQuery: (query: ProjectQuery) => void;
}

const ProjectContext = createContext<ProjectContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    projectQuery: undefined,
    setProjectQuery: () => void 0,
});

interface Props {
    children: ReactNode;
    initialProjectQuery?: ProjectQuery;
}

const ProjectProvider = ({ children, initialProjectQuery }: Props) => {
    const [projectQuery, setProjectQuery] = useState<ProjectQuery>(
        initialProjectQuery ? initialProjectQuery : ({} as ProjectQuery)
    );

    const { data, isLoading, message, status } = useProjects(projectQuery);

    return (
        <ProjectContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                message: message,
                status: status,
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
