import { TaskCreationData, TaskQuery } from "../../constants/tasks";
import { addTask } from "../../services/taskService";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTaskContext } from "../../providers/TaskProvider";

interface Props {
    projectId: number;
}

const NewTask = ({ projectId }: Props) => {
    const newTask = {
        project_id: projectId,
        name: "",
        estimated_hours: 0,
        hours_worked: 0,
    } as TaskCreationData;

    const { setTaskQuery } = useTaskContext();

    const handleSaveTask = async () => {
        try {
            await addTask(newTask);
            setTaskQuery({ project_id: projectId } as TaskQuery);
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
