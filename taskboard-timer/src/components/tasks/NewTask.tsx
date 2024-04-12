import { TaskCreationData } from "../../constants/tasks";
import { addTask } from "../../services/taskService";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    projectId: number;
    onCreateNew: () => void;
}

const NewTask = ({ projectId, onCreateNew }: Props) => {
    const newTask = {
        project_id: projectId,
        name: "",
        estimated_hours: 0,
        hours_worked: 0,
    } as TaskCreationData;

    const handleSaveTask = async () => {
        try {
            await addTask(newTask);
            onCreateNew();
        } catch (error) {
            console.error("Error adding new task: ", error);
        }
    };

    return (
        <IconButton onClick={handleSaveTask}>
            <AddIcon />
        </IconButton>
    );
};

export default NewTask;
