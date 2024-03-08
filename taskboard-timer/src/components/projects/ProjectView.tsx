import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ProjectQuery } from "../../hooks/useProjects";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import TaskView from "../tasks/TaskView";
import { TaskProvider } from "../../providers/TaskProvider";
import { useProjectContext } from "../../providers/ProjectProvider";

const ProjectView = () => {
    let { id } = useParams();
    const projectId = id ? parseInt(id, 10) : undefined;

    const { data, isLoading, error, setProjectQuery } = useProjectContext();

    useEffect(() => {
        if (projectId) {
            setProjectQuery({ id: projectId } as ProjectQuery);
            console.log(`PROJECT DATA CHANGED ${projectId}`);
            console.log(data);
        }
    }, []);

    console.log("PROJECT DATA");
    console.log(data);

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
