import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "../../providers/TaskProvider";
import { Divider, Stack, Typography } from "@mui/material";
import { StatusAlert } from "../StatusAlert";

const NewTaskTable = () => {
    const { data, isLoading, message, status, taskQuery } = useTaskContext();

    const projectId = taskQuery?.project_id;

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {status && <StatusAlert status={status} message={message} />}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h5">
                    Tasks for Project {projectId}
                </Typography>
                {projectId && <NewTask projectId={projectId} />}
            </Stack>
            <Divider sx={{ my: 1 }} />
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

export default NewTaskTable;
