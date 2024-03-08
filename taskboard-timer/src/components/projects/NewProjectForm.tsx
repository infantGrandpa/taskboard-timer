import { Container } from "@mui/material";
import ProjectForm from "./ProjectForm";

const NewProjectForm = () => {
    return (
        <Container maxWidth="sm">
            <ProjectForm type="new" />
        </Container>
    );
};

export default NewProjectForm;
