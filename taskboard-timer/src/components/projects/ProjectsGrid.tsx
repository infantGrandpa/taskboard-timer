import { CircularProgress, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../providers/ProjectProvider";
import { useEffect } from "react";
import { StatusAlert } from "../StatusAlert";

const ProjectsGrid = () => {
    const { data, isLoading, message, status, setProjectQuery } =
        useProjectContext();

    useEffect(() => {
        setProjectQuery({ id: null });
    }, []);

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
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                {isLoading && <CircularProgress />}
                {status && <StatusAlert status={status} message={message} />}

                <Grid xs={12} md={6} display="flex">
                    {data && data.length > 0 && (
                        <ProjectCard
                            variant="featured"
                            key={data[0].id}
                            project={data[0]}
                        />
                    )}
                </Grid>

                <Grid xs={12} md={6}>
                    <Stack spacing={2} justifyContent="space-between">
                        {data &&
                            data
                                .slice(1, 4)
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1.5 }}>
                {data &&
                    data.length > 4 &&
                    data.slice(4).map((project) => (
                        <Grid xs={12} md={4} key={project.id} display="flex">
                            <ProjectCard project={project} />
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default ProjectsGrid;
