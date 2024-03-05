import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useProjects from "../hooks/useProjects";
import LoadingBackdrop from "./LoadingBackdrop";
import ErrorMessage from "./ErrorMessage";
import EditableProjectCard from "./EditableProjectCard";

const ProjectView = () => {
    let { id } = useParams();
    /* const projectQuery = { id: id ? parseInt(id, 10) : undefined }; */ //For some reason this causes infinite refresh
    const [projectQuery, setProjectQuery] = useState({
        id: id ? parseInt(id, 10) : undefined,
    });

    const { data, isLoading, error } = useProjects(projectQuery);

    const thisProject = data ? data[0] : null;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {isLoading && <LoadingBackdrop />}
            {error && <ErrorMessage message={error} />}
            {thisProject && <EditableProjectCard project={thisProject} />}
        </Container>
    );
};

export default ProjectView;
