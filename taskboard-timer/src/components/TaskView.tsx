import { useEffect } from "react";
import { Project } from "../hooks/useProjects";
import { TaskQuery } from "../hooks/useTasks";
import ErrorMessage from "./ErrorMessage";
import LoadingBackdrop from "./LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "./TaskProvider";

interface Props {
    project: Project;
}

const TaskView = ({ project }: Props) => {
    const { data, isLoading, error, setTaskQuery } = useTaskContext();

    useEffect(() => {
        setTaskQuery({ project_id: project.id } as TaskQuery);
    }, []);

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            <NewTask
                project={project}
                onCreateNew={() =>
                    setTaskQuery({ project_id: project.id } as TaskQuery)
                }
            />
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
