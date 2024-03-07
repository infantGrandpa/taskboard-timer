import { useEffect, useState } from "react";
import { Project } from "../hooks/useProjects";
import useTasks, { TaskQuery } from "../hooks/useTasks";
import ErrorMessage from "./ErrorMessage";
import LoadingBackdrop from "./LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import TaskLogger from "./TaskLogger";

interface Props {
    project: Project;
}

const TaskView = ({ project }: Props) => {
    const [taskQuery, setTaskQuery] = useState<TaskQuery>({
        project_id: project.id,
    } as TaskQuery);
    const [taskAdded, setTaskAdded] = useState(false);

    const { data, isLoading, error, refetch } = useTasks(taskQuery);

    useEffect(() => {
        if (taskAdded) {
            refetch();
            console.log("Refetching...");
            setTaskAdded(false);
        }
    }, [taskAdded]);

    return (
        <>
            <TaskLogger />
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            <NewTask project={project} onCreateNew={() => setTaskAdded(true)} />
            {data && (
                <Grid container spacing={1}>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <Grid key={task.id} xs={12}>
                                <TaskRow task={task} />
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
