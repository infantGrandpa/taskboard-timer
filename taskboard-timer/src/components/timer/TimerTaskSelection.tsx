import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const TimerTaskSelection = () => {
    const [currentTask, setCurrentTask] = useState<string | undefined>(
        undefined
    );

    const handleTaskChange = (event: SelectChangeEvent) => {
        setCurrentTask(event.target.value as string);
    };

    return (
        <FormControl variant="filled" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentTask}
                label="Age"
                onChange={handleTaskChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    );
};

export default TimerTaskSelection;
