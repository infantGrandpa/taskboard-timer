import LoadingBackdrop from "../LoadingBackdrop";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import NewTaskTable from "../tasks/NewTaskTable";
import { TaskProvider } from "../../providers/TaskProvider";
import { useProjectContext } from "../../providers/ProjectProvider";
import { TaskQuery } from "../../hooks/useTasks";
import { SprintProvider } from "../../providers/SprintProvider";
import SprintList from "../sprints/SprintList";
import { SprintQuery } from "../../hooks/useSprints";
import { StatusAlert } from "../StatusAlert";
import { Project } from "../../hooks/useProjects";

const ProjectView = () => {
    const { data, isLoading, message, status } = useProjectContext();

    const thisProject = data as Project;

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
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
        </>
    );
};

export default ProjectView;
