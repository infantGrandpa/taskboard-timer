import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {
    projectId: number;
    onCreateNew?: (sprintId?: any) => void;
}

const NewSprintButton = ({ projectId }: Props) => {
    const navigate = useNavigate();

    return (
        <IconButton
            aria-label="new sprint"
            onClick={() => navigate(`/projects/${projectId}/new-sprint`)}
        >
            <AddIcon />
        </IconButton>
    );
};

export default NewSprintButton;
