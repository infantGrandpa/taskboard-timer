import { IconButton, Tooltip } from "@mui/material";
import { deleteTask } from "../../services/taskService";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../constants/tasks";

interface Props {
    task: Task;
    onDeleteSuccess?: () => void;
}

const DeleteTaskButton = ({ task, onDeleteSuccess }: Props) => {
    const handleDelete = async () => {
        await deleteTask(task);
        onDeleteSuccess?.();
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
