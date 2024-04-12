import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import useProjects from "../hooks/useProjects";
import { Project, ProjectQuery } from "../constants/projects";
import { deleteProject } from "../services/projectService";

interface ProjectContentType {
    data: Project[] | null | Project;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    projectQuery?: ProjectQuery;
    setProjectQuery: (query: ProjectQuery) => void;
    deleteProject: (projectToDelete: Project) => Promise<void>;
}

const ProjectContext = createContext<ProjectContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    projectQuery: undefined,
    setProjectQuery: () => {},
    deleteProject: async () => {},
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

    const [projectData, setProjectData] = useState(data);

    useEffect(() => {
        setProjectData(data);
    }, [data]);

    const deleteProjectOptimistic = async (projectToDelete: Project) => {
        const optimisticData = projectData.filter(
            (project) => project.id !== projectToDelete.id
        );

        setProjectData(optimisticData);

        try {
            await deleteProject(projectToDelete);
        } catch (error) {
            setProjectData(data);
            console.error(error);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                data: projectData,
                isLoading: isLoading,
                message: message,
                status: status,
                projectQuery: projectQuery,
                setProjectQuery: setProjectQuery,
                deleteProject: deleteProjectOptimistic,
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
