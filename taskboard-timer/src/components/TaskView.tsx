import useTasks from "../hooks/useTasks";
import ErrorMessage from "./ErrorMessage";
import LoadingBackdrop from "./LoadingBackdrop";
import TaskCard from "./TaskCard";
import Grid from "@mui/material/Unstable_Grid2";

const TaskView = () => {
    const { data, isLoading, error } = useTasks();

    console.log("TASK DATA");
    console.log(data);

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            {data && (
                <Grid container spacing={1}>
                    {data &&
                        data.map((task) => (
                            <Grid key={task.id} xs={6}>
                                <TaskCard task={task} />
                            </Grid>
                        ))}
                </Grid>
            )}
            {!data && <ErrorMessage message="No tasks yet!" />}
        </>
    );
};

export default TaskView;
