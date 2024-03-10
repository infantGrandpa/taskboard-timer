import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import NewTaskTable from "../tasks/NewTaskTable";
import { TaskProvider } from "../../providers/TaskProvider";
import { useProjectContext } from "../../providers/ProjectProvider";
import { TaskQuery } from "../../hooks/useTasks";
import { SprintProvider } from "../../providers/SprintProvider";
import SprintList from "../sprints/SprintList";
import { SprintQuery } from "../../hooks/useSprints";

const ProjectView = () => {
    const { data, isLoading, error } = useProjectContext();

    const thisProject = data ? data[0] : null;

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Grid container spacing={2}>
            {thisProject && (
                <>
                    <Grid xs={12} md={6}>
                        <EditableProjectCard project={thisProject} />
                        <SprintProvider
                            initialSprintQuery={
                                {
                                    project_id: thisProject.id,
                                } as SprintQuery
                            }
                        >
                            <SprintList />
                        </SprintProvider>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <TaskProvider
                            initialTaskQuery={
                                { project_id: thisProject.id } as TaskQuery
                            }
                        >
                            <NewTaskTable />
                        </TaskProvider>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default ProjectView;
