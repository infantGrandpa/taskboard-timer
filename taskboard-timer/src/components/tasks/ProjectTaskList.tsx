import LoadingBackdrop from "../LoadingBackdrop";
import Grid from "@mui/material/Unstable_Grid2";
import NewTask from "./NewTask";
import TaskRow from "./TaskRow";
import { useTaskContext } from "../../providers/TaskProvider";
import { Divider, Stack, Typography } from "@mui/material";
import { StatusAlert } from "../StatusAlert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ProjectTaskList = () => {
    const { data, isLoading, message, status, taskQuery } = useTaskContext();

    const projectId = taskQuery?.project_id;

    return (
        <Stack
            direction="column"
            alignItems="stretch"
            divider={<Divider flexItem />}
            justifyContent="flex-start"
            spacing={1}
            sx={{
                minHeight: "100%",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h5">All Tasks</Typography>
                {projectId && <NewTask projectId={projectId} />}
            </Stack>

            {data && data.length > 0 ? (
                <Grid container spacing={1}>
                    {data.map((task) => (
                        <Grid key={task.id} xs={12}>
                            <TaskRow task={task} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        flexGrow: "1",
                    }}
                >
                    {isLoading && <LoadingBackdrop />}
                    {status && (
                        <StatusAlert status={status} message={message} />
                    )}
                    <ErrorOutlineIcon
                        sx={{ fontSize: "3rem", mb: 1, color: "#A1A1A1" }}
                    />
                    <Typography variant="h5" sx={{ color: "#A1A1A1" }}>
                        No tasks yet!
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
};

export default ProjectTaskList;
