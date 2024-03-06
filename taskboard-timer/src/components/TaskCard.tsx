import { Card, CardContent, Grow, Stack, Typography } from "@mui/material";
import { Task } from "../hooks/useTasks";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
    task: Task;
}

const TaskCard = ({ task }: Props) => {
    return (
        <Grow in={true} timeout={200}>
            <Card>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5">{task.name}</Typography>
                        <DeleteTaskButton task={task} />
                    </Stack>
                    <Typography variant="caption">{task.id}</Typography>
                    <Typography variant="body1">
                        Project ID: {task.project_id}
                    </Typography>
                </CardContent>
            </Card>
        </Grow>
    );
};

export default TaskCard;
