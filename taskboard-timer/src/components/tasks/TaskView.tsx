import { useEffect } from "react";
import { Project } from "../../hooks/useProjects";
import { TaskQuery } from "../../hooks/useTasks";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "../../providers/TaskProvider";
import { Typography } from "@mui/material";

interface Props {
    project: Project;
}

const TaskView = ({ project }: Props) => {
    const { data, isLoading, error, setTaskQuery } = useTaskContext();

    useEffect(() => {
        setTaskQuery({ project_id: project.id } as TaskQuery);
        console.log(`Changed task query to project: ${project.id}`);
    }, []);

    return (
        <>
            <Typography variant="h5">Tasks for Project {project.id}</Typography>
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
