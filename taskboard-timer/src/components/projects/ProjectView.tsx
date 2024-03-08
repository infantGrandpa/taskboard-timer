import { useParams } from "react-router-dom";
import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import TaskView from "../tasks/TaskView";
import { TaskProvider } from "../../providers/TaskProvider";

const ProjectView = () => {
    let { id } = useParams();
    /* const projectQuery = { id: id ? parseInt(id, 10) : undefined }; */ //For some reason this causes infinite refresh
    const [projectQuery, setProjectQuery] = useState({
        id: id ? parseInt(id, 10) : undefined,
    });

    const { data, isLoading, error } = useProjects(projectQuery);

    const thisProject = data ? data[0] : null;

    return (
        <Grid container spacing={2}>
            {isLoading && <LoadingBackdrop />}
            <Grid xs={12} md={6} display="flex">
                {error && <ErrorMessage message={error} />}
                {thisProject && <EditableProjectCard project={thisProject} />}
            </Grid>
            {thisProject && (
                <Grid xs={12} md={6}>
                    <TaskProvider>
                        <TaskView project={thisProject} />
                    </TaskProvider>
                </Grid>
            )}
        </Grid>
    );
};

export default ProjectView;
