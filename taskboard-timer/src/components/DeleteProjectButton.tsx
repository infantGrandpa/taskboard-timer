import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "../hooks/useProjects";
import { deleteProject } from "../services/projectService";

interface Props {
    project: Project;
    onDeleteSuccess: () => void;
}

const DeleteProjectButton = ({ project, onDeleteSuccess }: Props) => {
    const handleDelete = async () => {
        await deleteProject(project);
        onDeleteSuccess();
    };

    return (
        <Tooltip title="Delete Project">
            <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteProjectButton;
