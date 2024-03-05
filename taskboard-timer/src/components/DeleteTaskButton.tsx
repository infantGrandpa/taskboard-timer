import { IconButton } from "@mui/material";
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
        <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteTaskButton;
