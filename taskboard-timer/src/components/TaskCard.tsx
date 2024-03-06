import {
    Card,
    CardContent,
    Grow,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Task } from "../hooks/useTasks";
import DeleteTaskButton from "./DeleteTaskButton";
import { useState } from "react";
import { TaskCreationData } from "../services/taskService";

interface Props {
    task: Task;
}

const TaskCard = ({ task }: Props) => {
    const [taskInputs, setTaskInputs] = useState({
        project_id: task.project_id,
        name: task.name,
        estimated_hours: task.estimated_hours,
        hours_worked: task.hours_worked,
    } as TaskCreationData);

    return (
        <Grow in={true} timeout={200}>
            <Card>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <TextField
                            id={`task-name-${task.id}`}
                            label="Name"
                            variant="filled"
                            value={taskInputs.name}
                        />
                        <DeleteTaskButton task={task} />
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mt: 1 }}
                    >
                        <Typography variant="caption">
                            PID: {task.project_id}
                        </Typography>
                        <Typography variant="caption">{task.id}</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Grow>
    );
};

export default TaskCard;
