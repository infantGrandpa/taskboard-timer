import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../constants/tasks";
import { useTaskContext } from "../../providers/TaskProvider";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";

interface Props {
    task: Task;
}

const DeleteTaskButton = ({ task }: Props) => {
    const { deleteTask } = useTaskContext();
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = async () => {
        deleteTask(task).catch(console.error);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <ConfirmationDialog
                isOpen={openDialog}
                dialogTitle={`Delete "${task.name}" Task?`}
                dialogText={`Are you sure you want to delete the "${task.name}" task? This action cannot be undone.`}
                onClose={handleCloseDialog}
                onConfirm={handleDelete}
                confirmButtonText="Delete Task"
                confirmButtonColor="error"
            />
            <Tooltip title="Delete Task">
                <IconButton aria-label="Delete Task" onClick={handleOpenDialog}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default DeleteTaskButton;
