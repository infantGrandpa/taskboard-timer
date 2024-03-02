import { CircularProgress, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import DynamicTable from "./DynamicTable";
import { Link } from "react-router-dom";

const ProjectsGrid = () => {
    const { data, isLoading, error, refetch } = useProjects();

    console.log(data);

    const projectsColumns = [
        { field: "id", label: "ID" },
        { field: "name", label: "Name" },
        { field: "description", label: "Description" },
        { field: "client", label: "Client" },
        { field: "start_date", label: "Start Date" },
        { field: "end_date", label: "End Date" },
    ];

    return (
        <>
            <Typography variant="h2">Total Projects: {data?.length}</Typography>
            <Fab
                component={Link}
                to="/new-project"
                color="primary"
                aria-label="create new project"
                size="large"
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                }}
            >
                <AddIcon fontSize="large" />
            </Fab>

            <Grid container spacing={2}>
                {isLoading && <CircularProgress />}
                {error && <ErrorMessage message={error} />}

                <Grid xs={12} md={6}>
                    {data && data.length > 0 && (
                        <ProjectCard
                            variant="featured"
                            key={data[0].id}
                            project={data[0]}
                            onDelete={refetch}
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
                                    onDelete={refetch}
                                />
                            ))}
                </Grid>
                {data && data.length > 4 && (
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
