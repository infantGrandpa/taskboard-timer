import LoadingBackdrop from "../LoadingBackdrop";
import EditableProjectCard from "./EditableProjectCard";
import Grid from "@mui/material/Unstable_Grid2";
import ProjectTaskList from "../tasks/ProjectTaskList";
import { TaskProvider } from "../../providers/TaskProvider";
import { useProjectContext } from "../../providers/ProjectProvider";
import { SprintProvider } from "../../providers/SprintProvider";
import SprintList from "../sprints/SprintList";
import { StatusAlert } from "../StatusAlert";
import { Project } from "../../constants/projects";
import { SprintQuery } from "../../constants/sprints";
import { TaskQuery } from "../../constants/tasks";

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
                                <ProjectTaskList />
                            </TaskProvider>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};

export default ProjectView;
