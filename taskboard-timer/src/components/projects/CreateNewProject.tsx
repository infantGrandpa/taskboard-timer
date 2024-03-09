import { Container } from "@mui/material";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";

const CreateNewProject = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <ProjectForm
                type="new"
                onSave={(projectId) =>
                    navigate(`/projects/${projectId}/new-tasks`)
                }
            />
        </Container>
    );
};

export default CreateNewProject;
