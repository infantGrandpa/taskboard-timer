import { IconButton } from "@mui/material";
import { SprintCreationData, addSprint } from "../../services/sprintService";
import AddIcon from "@mui/icons-material/Add";

interface Props {
    projectId: number;
    onCreateNew?: (sprintId?: any) => void;
}

const NewSprintButton = ({ projectId, onCreateNew }: Props) => {
    const newSprint = {
        project_id: projectId,
        name: "Test Sprint",
        total_hours: 20,
        completed_hours: 0,
    } as SprintCreationData;

    const handleSaveSprint = async () => {
        try {
            const response = await addSprint(newSprint);
            onCreateNew?.(response.id);
        } catch (error) {
            console.error("Error adding new sprint: ", error);
        }
    };

    return (
        <IconButton aria-label="new sprint" onClick={handleSaveSprint}>
            <AddIcon />
        </IconButton>
    );
};

export default NewSprintButton;
