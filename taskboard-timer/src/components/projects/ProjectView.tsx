import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import TaskView from "../tasks/TaskView";
import { TaskProvider } from "../../providers/TaskProvider";
import { useProjectContext } from "../../providers/ProjectProvider";
import { TaskQuery } from "../../hooks/useTasks";

const ProjectView = () => {
    const { data, isLoading, error } = useProjectContext();

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
                    <TaskProvider
                        initialTaskQuery={
                            { project_id: thisProject.id } as TaskQuery
                        }
                    >
                        <TaskView />
                    </TaskProvider>
                </Grid>
            )}
        </Grid>
    );
};

export default ProjectView;
