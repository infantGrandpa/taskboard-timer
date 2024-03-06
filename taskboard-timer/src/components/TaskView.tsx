import { useState } from "react";
import { Project } from "../hooks/useProjects";
import useTasks, { TaskQuery } from "../hooks/useTasks";
import ErrorMessage from "./ErrorMessage";
import LoadingBackdrop from "./LoadingBackdrop";
import TaskCard from "./TaskCard";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";

interface Props {
    project: Project;
}

const TaskView = ({ project }: Props) => {
    const [taskQuery, setTaskQuery] = useState<TaskQuery>({
        project_id: project.id,
    } as TaskQuery);

    const { data, isLoading, error, refetch } = useTasks(taskQuery);

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            <NewTask project={project} onCreateNew={refetch} />
            {data && (
                <Grid container spacing={1}>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <Grid key={task.id} xs={6}>
                                <TaskCard task={task} />
                            </Grid>
                        ))
                    ) : (
                        <ErrorMessage message="No tasks yet!" />
                    )}
                </Grid>
            )}
        </>
    );
};

export default TaskView;
