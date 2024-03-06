import { useState } from "react";
import { Task } from "../hooks/useTasks";
import { TaskCreationData } from "../services/taskService";
import { Stack, TextField } from "@mui/material";
import DeleteTaskButton from "./DeleteTaskButton";
import NumberInput from "./NumberInput";

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
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ my: 0.25 }}
        >
            <TextField
                fullWidth
                id={`task-name-${task.id}`}
                label="Name"
                variant="filled"
                value={taskInputs.name}
            />
            {/* <TextField
                id={`task-name-${task.id}`}
                label="Estimated hours"
                variant="filled"
                value={taskInputs.estimated_hours}
                type="number"
                size="small"
                sx={{ maxWidth: "150px" }}
                onChange={(e) =>
                    setTaskInputs({
                        ...taskInputs,
                        estimated_hours: Number(e.target.value),
                    })
                }
            /> */}
            <NumberInput initialValue={0} min={0} />
            <DeleteTaskButton task={task} />
        </Stack>
    );
};

export default TaskRow;
