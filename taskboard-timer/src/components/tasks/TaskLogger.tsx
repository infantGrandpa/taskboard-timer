import { useTaskContext } from "../../providers/TaskProvider";
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { TaskQuery } from "../../hooks/useTasks";
import { Project } from "../../hooks/useProjects";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useEffect } from "react";

interface Props {
    project: Project;
}

const TaskLogger = ({ project }: Props) => {
    const { data, isLoading, error, taskQuery, setTaskQuery } =
        useTaskContext();

    const handleQueryChange = () => {
        if (taskQuery?.project_id) {
            setTaskQuery({ project_id: null } as TaskQuery);
        } else {
            setTaskQuery({ project_id: project.id } as TaskQuery);
        }
    };

    useEffect(() => {
        setTaskQuery({ project_id: project.id } as TaskQuery);
    }, []);

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message="error" />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 5 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Typography variant="h5">
                    {taskQuery?.project_id
                        ? `Project ${taskQuery.project_id}`
                        : "No Project Filter"}
                </Typography>
                <Button
                    onClick={handleQueryChange}
                    variant="contained"
                    color="secondary"
                >
                    Toggle Query
                </Button>
            </Stack>

            <Stack direction="row" spacing={2}></Stack>
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
