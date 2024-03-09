import { ProjectProvider } from "../providers/ProjectProvider";
import ProjectsGrid from "./projects/ProjectsGrid";
import NewSprintButton from "./sprints/NewSprintButton";
import SprintList from "./sprints/SprintList";

const HomePage = () => {
    return (
        <ProjectProvider>
            <NewSprintButton />
            <SprintList />
            <ProjectsGrid />
        </ProjectProvider>
    );
};

export default HomePage;
