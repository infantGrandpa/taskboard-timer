import LoadingBackdrop from "../LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "../../providers/TaskProvider";
import { Divider, Stack, Typography } from "@mui/material";
import { StatusAlert } from "../StatusAlert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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

            <Grid container spacing={1}>
                {data && data.length > 0 ? (
                    data.map((task) => (
                        <Grid key={task.id} xs={12}>
                            <TaskRow task={task} />
                        </Grid>
                    ))
                ) : (
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            width: "100%",
                            minHeight: "400px",
                        }}
                    >
                        <ErrorOutlineIcon
                            sx={{ fontSize: "3rem", mb: 1, color: "#A1A1A1" }}
                        />
                        <Typography variant="h5" sx={{ color: "#A1A1A1" }}>
                            No tasks yet!
                        </Typography>
                    </Stack>
                )}
            </Grid>
        </>
    );
};

export default NewTaskTable;
