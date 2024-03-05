import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Task } from "../hooks/useTasks";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
    task: Task;
}

const TaskCard = ({ task }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Name: {task.name}</Typography>
                <Typography variant="caption">Task ID: {task.id}</Typography>
                <Typography variant="body1">
                    Project ID: {task.project_id}
                </Typography>
            </CardContent>
            <CardActions>
                <DeleteTaskButton task={task} />
            </CardActions>
        </Card>
    );
};

export default TaskCard;
