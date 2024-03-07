import { IconButton, Tooltip } from "@mui/material";
import { Task } from "../hooks/useTasks";
import { deleteTask } from "../services/taskService";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    task: Task;
}

const DeleteTaskButton = ({ task }: Props) => {
    const handleDelete = async () => {
        await deleteTask(task);
    };

    return (
        <Tooltip title="Delete Task">
            <IconButton aria-label="Delete Task" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteTaskButton;
