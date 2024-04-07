import { Stack, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";
import SprintTaskCard from "./SprintTaskCard";

interface Props {
    tasks: SprintTask[] | undefined;
    priority: string;
    status: string;
}

const SprintTaskCell = ({ tasks, priority, status }: Props) => {
    console.log("IN CELL");
    console.log(tasks);

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption">{priority}</Typography>
                <Typography variant="caption">{status}</Typography>
            </Stack>
            {tasks?.map((task) => (
                <SprintTaskCard sprintTask={task} key={task.task_id} />
            ))}
        </Stack>
    );
};

export default SprintTaskCell;
