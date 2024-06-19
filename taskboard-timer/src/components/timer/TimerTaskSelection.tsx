import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { useSprintTaskContext } from "../../providers/SprintTaskProvider";
import ErrorMessage from "../ErrorMessage";
import { useTimerContext } from "../../providers/TimerProvider";

interface Props {
    timerActive: boolean;
}

const TimerTaskSelection = ({ timerActive }: Props) => {
    const { data } = useSprintTaskContext();
    const { currentTask, setCurrentTask } = useTimerContext();

    if (!data) {
        return <ErrorMessage message="Sprint Task data is empty!" />;
    }

    const handleTaskChange = (event: SelectChangeEvent) => {
        const selectedTaskId = Number(event.target.value);

        const selectedTask = data.find(
            (task) => task.task_id === selectedTaskId
        );

        setCurrentTask(selectedTask);
    };

    if (timerActive) {
        return (
            <Typography variant="h4" sx={{ mt: 2 }}>
                {currentTask?.task_details.name}
            </Typography>
        );
    }

    return (
        <FormControl variant="filled" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="current-task-select-label">Current Task</InputLabel>
            <Select
                labelId="current-task-select-label"
                id="current-task-select"
                value={currentTask ? currentTask.task_id.toString() : ""}
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
