import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "../hooks/useProjects";
import { deleteProject } from "../services/projectService";

interface Props {
    project: Project;
}

const DeleteProjectButton = ({ project }: Props) => {
    const handleDelete = async () => {
        await deleteProject(project);
    };

    return (
        <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteProjectButton;
