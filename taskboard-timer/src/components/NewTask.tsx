import { TaskCreationData, addTask } from "../services/taskService";
import { Button } from "@mui/material";
import { Project } from "../hooks/useProjects";

interface Props {
    project: Project;
    onCreateNew: () => void;
}

const NewTask = ({ project, onCreateNew }: Props) => {
    const task = {
        project_id: project.id,
        name: "",
        estimated_hours: 0,
        hours_worked: 0,
    } as TaskCreationData;

    const handleSaveTask = async () => {
        try {
            await addTask(task);
            onCreateNew();
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    return (
        <Button onClick={handleSaveTask} variant="contained">
            Add New Task
        </Button>
    );
};

export default NewTask;
