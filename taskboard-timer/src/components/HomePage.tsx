import { ProjectProvider } from "../providers/ProjectProvider";
import ProjectsGrid from "./projects/ProjectsGrid";

const HomePage = () => {
    return (
        <ProjectProvider>
            <ProjectsGrid />
        </ProjectProvider>
    );
};

export default HomePage;
