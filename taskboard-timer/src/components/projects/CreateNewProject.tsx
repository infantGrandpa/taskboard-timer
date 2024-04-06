import { Container } from "@mui/material";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";

const CreateNewProject = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <ProjectForm
                type="new"
                onSave={(projectId) => navigate(routes.project(projectId))}
            />
        </Container>
    );
};

export default CreateNewProject;
