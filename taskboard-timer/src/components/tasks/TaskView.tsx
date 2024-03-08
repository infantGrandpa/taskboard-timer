import { TaskQuery } from "../../hooks/useTasks";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "../../providers/TaskProvider";
import { Typography } from "@mui/material";

const TaskView = () => {
    const { data, isLoading, error, taskQuery, setTaskQuery } =
        useTaskContext();

    const projectId = taskQuery?.project_id;

    return (
        <>
            <Typography variant="h5">Tasks for Project {projectId}</Typography>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            {projectId && (
                <NewTask
                    projectId={projectId}
                    onCreateNew={() =>
                        setTaskQuery({ project_id: projectId } as TaskQuery)
                    }
                />
            )}
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
