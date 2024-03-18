import { Divider, Stack, Typography } from "@mui/material";
import { useSprintTaskContext } from "../../providers/SprintTaskProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useParams } from "react-router-dom";

const SprintTaskPrioritizeList = () => {
    const { data, isLoading, error } = useSprintTaskContext();

    const { sprintId } = useParams();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Stack direction="column" spacing={1} divider={<Divider flexItem />}>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ my: 2 }}
            >
                <Typography variant="h4">
                    Prioritization for Sprint {sprintId}
                </Typography>
                <Typography variant="h4">Tasks: {data?.length}</Typography>
            </Stack>
            {data &&
                data.map((task) => (
                    <Typography variant="body1" key={task.task_id}>
                        {task.task_id}: {task.task_details.name}
                    </Typography>
                ))}
        </Stack>
    );
};

export default SprintTaskPrioritizeList;
