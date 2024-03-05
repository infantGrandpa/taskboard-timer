import useTasks from "../hooks/useTasks";
import ErrorMessage from "./ErrorMessage";
import LoadingBackdrop from "./LoadingBackdrop";
import TaskCard from "./TaskCard";
import { Stack } from "@mui/material";

const TaskView = () => {
    const { data, isLoading, error } = useTasks();

    return (
        <>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            {data && (
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={1}
                >
                    {data &&
                        data.length > 4 &&
                        data.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                </Stack>
            )}
        </>
    );
};

export default TaskView;
