import { Container } from "@mui/material";
import ProjectForm from "./ProjectForm";
import NewTaskTable from "../tasks/NewTaskTable";
import { TaskProvider } from "../../providers/TaskProvider";

const CreateNewProject = () => {
    return (
        <Container maxWidth="sm">
            <ProjectForm type="new" />
        </Container>
    );
};

export default CreateNewProject;
