import { useEffect } from "react";
import { useTaskContext } from "./TaskProvider";
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { TaskQuery } from "../hooks/useTasks";

const TaskLogger = () => {
    const {
        data,
        isLoading,
        error,
        refreshNeeded,
        triggerRefresh,
        resetRefresh,
        taskQuery,
        setTaskQuery,
    } = useTaskContext();

    useEffect(() => {
        console.log("USE EFFECT TRIGGERED");
        console.log(`refreshNeeded: ${refreshNeeded}`);
        console.log("DATA");
        console.log(data);
        console.log(`isLoading: ${isLoading}`);
        console.log(`error: ${error}`);
    }, [taskQuery]);

    const handleQueryChange = () => {
        if (taskQuery?.project_id === 17) {
            setTaskQuery({ project_id: null } as TaskQuery);
        } else {
            setTaskQuery({ project_id: 17 } as TaskQuery);
        }
    };

    return (
        <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 5 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Typography variant="h5">
                    {refreshNeeded ? "Refresh Needed" : "No Refresh Needed"}
                </Typography>
                <Typography variant="body1">
                    Project ID: {taskQuery?.project_id}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button onClick={triggerRefresh} variant="contained">
                    Trigger Refresh
                </Button>
                <Button
                    onClick={handleQueryChange}
                    variant="contained"
                    color="secondary"
                >
                    Toggle Query
                </Button>
                <Button onClick={resetRefresh} variant="outlined">
                    Reset Refresh
                </Button>
            </Stack>
            <Typography variant="h6">Task List ({data?.length})</Typography>
            <List
                dense
                sx={{ backgroundColor: "secondary.dark", borderRadius: 1 }}
            >
                {data &&
                    data.map((task) => (
                        <ListItem key={task.id}>
                            <ListItemText>
                                {task.name.length > 0
                                    ? `${task.name} (${task.id})`
                                    : `Task ${task.id}`}
                            </ListItemText>
                        </ListItem>
                    ))}
            </List>
        </Stack>
    );
};

export default TaskLogger;
