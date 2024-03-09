import { Button } from "@mui/material";
import { SprintCreationData, addSprint } from "../../services/sprintService";

const NewSprintButton = () => {
    const newSprint = {
        project_id: 17,
        name: "Test Sprint",
        total_hours: 20,
        completed_hours: 0,
    } as SprintCreationData;

    const handleSaveSprint = async () => {
        try {
            await addSprint(newSprint);
        } catch (error) {
            console.error("Error adding new sprint: ", error);
        }
    };

    return (
        <Button
            onClick={handleSaveSprint}
            variant="contained"
            color="secondary"
        >
            Add New Sprint
        </Button>
    );
};

export default NewSprintButton;
