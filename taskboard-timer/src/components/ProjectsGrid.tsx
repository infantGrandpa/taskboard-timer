import { CircularProgress, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";
import { addProject } from "../services/projectService";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import DynamicTable from "./DynamicTable";

const ProjectsGrid = () => {
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

    const projectsColumns = [
        { field: "id", label: "ID" },
        { field: "name", label: "Project Name" },
    ];

    return (
        <>
            <Typography variant="h2" sx={{ pt: 2 }}>
                Total Projects: {data?.length}
            </Typography>

            <IconButton
                color="primary"
                aria-label="add new project"
                size="large"
                onClick={handleAddProject}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    bgcolor: "white",
                }}
            >
                <AddIcon fontSize="large" />
            </IconButton>

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
                {data && (
                    <Grid xs={12}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            All Projects
                        </Typography>
                        <DynamicTable
                            data={data.slice(4)}
                            columns={projectsColumns}
                        />
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default ProjectsGrid;
