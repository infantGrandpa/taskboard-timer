import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import DynamicTable from "./DynamicTable";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";
import { addProject } from "../services/projectService";
import ProjectCard from "./ProjectCard";

const ProjectsTable = () => {
    const { data, isLoading, error, refetch } = useProjects();

    const handleAddProject = async () => {
        const projectData = { name: "My New Project" };
        try {
            await addProject(projectData);
            refetch();
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    return (
        <>
            {isLoading && <CircularProgress />}
            {error && <ErrorMessage message={error} />}

            {data &&
                data.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            <Button
                variant="contained"
                onClick={handleAddProject}
                startIcon={<AddIcon />}
            >
                Add New Project
            </Button>
        </>
    );
};

export default ProjectsTable;
