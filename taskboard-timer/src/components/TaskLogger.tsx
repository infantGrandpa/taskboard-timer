import { useEffect } from "react";
import { useTaskContext } from "./TaskProvider";
import { Button, Stack, Typography } from "@mui/material";

const TaskLogger = () => {
    const { refreshNeeded, triggerRefresh, resetRefresh } = useTaskContext();

    useEffect(() => {
        console.log(`refreshNeeded: ${refreshNeeded}`);
    }, [refreshNeeded]);

    return (
        <Stack
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ mt: 3, mb: 5 }}
        >
            <Typography variant="h5">
                {refreshNeeded ? "Refresh is needed!" : "No refresh needed."}
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button onClick={triggerRefresh} variant="contained">
                    Trigger Refresh
                </Button>
                <Button onClick={resetRefresh} variant="outlined">
                    Reset Refresh
                </Button>
            </Stack>
        </Stack>
    );
};

export default TaskLogger;
