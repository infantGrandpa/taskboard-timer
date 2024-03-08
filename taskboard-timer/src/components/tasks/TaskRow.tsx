import { useState } from "react";
import { Task } from "../../hooks/useTasks";
import { TaskCreationData, editTask } from "../../services/taskService";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import DeleteTaskButton from "./DeleteTaskButton";
import NumberInput from "../NumberInput";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
    task: Task;
}

const TaskRow = ({ task }: Props) => {
    const [taskInputs, setTaskInputs] = useState({
        project_id: task.project_id,
        name: task.name,
        estimated_hours: task.estimated_hours,
        hours_worked: task.hours_worked,
    } as TaskCreationData);

    const handleSaveEdits = async () => {
        await editTask(task, taskInputs);
    };

    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ my: 0.25 }}
        >
            <Typography variant="body1" fontWeight={600}>
                {task.project_id}:{task.id}
            </Typography>
            <TextField
                fullWidth
                id={`task-name-${task.id}`}
                label="Name"
                variant="filled"
                value={taskInputs.name}
                onChange={(newValue) =>
                    setTaskInputs({
                        ...taskInputs,
                        name: newValue.target.value,
                    })
                }
            />
            <NumberInput
                id={`task-est-hours-${task.id}`}
                initialValue={taskInputs.estimated_hours}
                min={0}
                onChange={(newValue) =>
                    setTaskInputs({
                        ...taskInputs,
                        estimated_hours: newValue,
                    })
                }
            />
            <IconButton onClick={handleSaveEdits}>
                <SaveIcon />
            </IconButton>
            <DeleteTaskButton task={task} />
        </Stack>
    );
};

export default TaskRow;
