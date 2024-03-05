import { Container, Stack } from "@mui/material";
import { HomeButton } from "./HomeButton";
import ProjectForm from "./ProjectForm";

const NewProjectForm = () => {
    return (
        <Container maxWidth="sm">
            <Stack direction="row" justifyContent="space-between">
                <HomeButton />
            </Stack>
            <ProjectForm type="new" />
        </Container>
    );
};

export default NewProjectForm;
