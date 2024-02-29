import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";
import { addProject } from "../services/projectService";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";

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
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={24}
            >
                <Typography>Total: {data?.length}</Typography>
                <Button
                    variant="contained"
                    onClick={handleAddProject}
                    startIcon={<AddIcon />}
                >
                    Add New Project
                </Button>
            </Stack>

            <Grid container spacing={2}>
                {isLoading && <CircularProgress />}
                {error && <ErrorMessage message={error} />}

                <Grid xs={12} md={6}>
                    {data && data.length > 0 && (
                        <ProjectCard
                            variant="featured"
                            key={data[0].id}
                            project={data[0]}
                        />
                    )}
                </Grid>

                <Grid xs={12} md={6}>
                    {data &&
                        data
                            .slice(1, 4)
                            .map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectsTable;
