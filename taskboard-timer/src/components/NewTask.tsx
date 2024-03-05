import { useState } from "react";
import { TaskCreationData, addTask } from "../services/taskService";
import { Button } from "@mui/material";

const NewTask = () => {
    const [task, setTask] = useState({
        project_id: 17,
        name: "New Task",
        estimated_hours: 20,
        hours_worked: 0,
    } as TaskCreationData);

    const handleSaveTask = async () => {
        try {
            await addTask(task);
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    return <Button onClick={handleSaveTask}>Add New Task</Button>;
};

export default NewTask;
