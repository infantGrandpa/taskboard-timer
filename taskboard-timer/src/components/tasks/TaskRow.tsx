import { useState } from "react";
import { Task } from "../../hooks/useTasks";
import { TaskCreationData, editTask } from "../../services/taskService";
import { Stack, TextField, Typography } from "@mui/material";
import DeleteTaskButton from "./DeleteTaskButton";
import NumberInput from "../NumberInput";

interface Props {
    task: Task;
}

const TaskRow = ({ task }: Props) => {
    const [taskData, setTaskData] = useState({
        id: task.id,
        project_id: task.project_id,
        name: task.name,
        estimated_hours: task.estimated_hours,
        hours_worked: task.hours_worked,
    } as Task);
    const [taskInputs, setTaskInputs] = useState({
        project_id: taskData.project_id,
        name: taskData.name,
        estimated_hours: taskData.estimated_hours,
        hours_worked: taskData.hours_worked,
    } as TaskCreationData);

    const handleSaveEdits = async () => {
        if (!wasFormEdited()) {
            return;
        }

        try {
            await editTask(taskData, taskInputs);
            setTaskData({
                ...taskData,
                project_id: taskInputs.project_id,
                name: taskInputs.name,
                estimated_hours: taskInputs.estimated_hours,
                hours_worked: taskInputs.hours_worked,
            });
        } catch (error) {
            console.error(`Error editing task ${taskData.id}: ${error}`);
        }
    };

    const wasFormEdited = () => {
        const wasProjectEdited = taskData.project_id !== taskInputs.project_id;
        const wasNameEdited = taskData.name !== taskInputs.name;
        const wasEstHoursEdited =
            taskData.estimated_hours !== taskInputs.estimated_hours;
        const wasHoursWorkedEdited =
            taskData.hours_worked !== taskInputs.hours_worked;

        const wasEdited =
            wasProjectEdited ||
            wasNameEdited ||
            wasEstHoursEdited ||
            wasHoursWorkedEdited;

        return wasEdited;
    };

    return (
        <form onBlur={handleSaveEdits} autoComplete="off">
            <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{ my: 0.25 }}
            >
                <Typography variant="body1" fontWeight={600}>
                    {taskData.project_id}:{taskData.id}
                </Typography>
                <TextField
                    fullWidth
                    id={`task-name-${taskData.id}`}
                    label="Name"
                    variant="filled"
                    value={taskInputs.name}
                    autoComplete="off"
                    onChange={(newValue) =>
                        setTaskInputs({
                            ...taskInputs,
                            name: newValue.target.value,
                        })
                    }
                />
                <NumberInput
                    id={`task-est-hours-${taskData.id}`}
                    label="Est. Hours"
                    initialValue={taskInputs.estimated_hours}
                    min={0}
                    onChange={(newValue) =>
                        setTaskInputs({
                            ...taskInputs,
                            estimated_hours: newValue,
                        })
                    }
                />
                <DeleteTaskButton task={task} />
            </Stack>
        </form>
    );
};

export default TaskRow;
