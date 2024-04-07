import { Stack, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";
import SprintTaskCard from "./SprintTaskCard";

interface Props {
    tasks: SprintTask[] | undefined;
    priority: string;
    status: string;
}

const SprintTaskCell = ({ tasks, priority, status }: Props) => {
    return (
        <Stack spacing={1}>
            <Typography variant="caption">
                {priority} {status}
            </Typography>
            {tasks?.map((task) => (
                <SprintTaskCard sprintTask={task} key={task.task_id} />
            ))}
        </Stack>
    );
};

export default SprintTaskCell;
