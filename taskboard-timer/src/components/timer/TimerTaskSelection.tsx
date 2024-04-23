import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useSprintTaskContext } from "../../providers/SprintTaskProvider";

const TimerTaskSelection = () => {
    const { data } = useSprintTaskContext();

    console.log("SPRINT TASK DATA");
    console.log(data);

    const [currentTask, setCurrentTask] = useState<string | undefined>(
        undefined
    );

    const handleTaskChange = (event: SelectChangeEvent) => {
        setCurrentTask(event.target.value as string);
    };

    return (
        <FormControl variant="filled" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="current-task-select-label">Current Task</InputLabel>
            <Select
                labelId="current-task-select-label"
                id="current-task-select"
                value={currentTask}
                label="Current Task"
                onChange={handleTaskChange}
            >
                {data?.map((task) => (
                    <MenuItem key={task.task_id} value={task.task_id}>
                        {task.task_details.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TimerTaskSelection;
