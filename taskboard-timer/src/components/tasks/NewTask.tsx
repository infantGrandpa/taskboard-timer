import { TaskCreationData } from "../../constants/tasks";
import { addTask } from "../../services/taskService";
import { Button } from "@mui/material";

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
        <Button onClick={handleSaveTask} variant="contained">
            Add New Task
        </Button>
    );
};

export default NewTask;
