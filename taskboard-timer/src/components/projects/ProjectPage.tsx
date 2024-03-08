import { ProjectProvider } from "../../providers/ProjectProvider";
import ProjectView from "./ProjectView";
import { useParams } from "react-router-dom";
import { ProjectQuery } from "../../hooks/useProjects";

const ProjectPage = () => {
    let { id } = useParams();
    const projectId = id ? parseInt(id, 10) : undefined;

    return (
        <ProjectProvider
            initialProjectQuery={{ id: projectId } as ProjectQuery}
        >
            <ProjectView />
        </ProjectProvider>
    );
};

export default ProjectPage;
