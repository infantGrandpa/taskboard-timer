import {
    CircularProgress,
    Fab,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import DynamicTable from "./DynamicTable";
import { useState } from "react";
import { addProject, ProjectCreationData } from "../services/projectService";
import { Link } from "react-router-dom";

const ProjectsGrid = () => {
    const { data, isLoading, error, refetch } = useProjects();
    const [projectName, setProjectName] = useState("");

    const handleAddProject = async () => {
        const projectData: ProjectCreationData = {
            name: projectName,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed quam nec erat varius molestie.",
            client: "Just me!",
            start_date: new Date(2024, 2, 1),
            end_date: new Date(2024, 11, 31),
        };
        try {
            await addProject(projectData);
            refetch();
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

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
            <Typography variant="h2" sx={{ pt: 2 }}>
                Total Projects: {data?.length}
            </Typography>
            <Link to="/new-project">Create New Project</Link>
            <Stack direction="row">
                <TextField
                    id="project-name"
                    label="Project Name"
                    variant="standard"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </Stack>
            <Fab
                color="primary"
                aria-label="add new project"
                size="large"
                onClick={handleAddProject}
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
