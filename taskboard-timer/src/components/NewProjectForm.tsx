import { Button, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectCreationData, addProject } from "../services/projectService";
import { useState } from "react";

const NewProjectForm = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");

    const handleAddProject = async () => {
        const projectData: ProjectCreationData = {
            name: projectName,
            description: description,
            client: client,
            start_date: new Date(2024, 2, 1),
            end_date: new Date(2024, 11, 31),
        };
        try {
            await addProject(projectData);
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    return (
        <>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                aria-label="home"
            >
                Home
            </Button>
            <Stack direction="column" spacing={2}>
                <TextField
                    id="project-name-field"
                    label="Project Name"
                    variant="standard"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <TextField
                    id="description-field"
                    label="Description"
                    multiline
                    minRows={2}
                    maxRows={5}
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    id="client-field"
                    label="Client"
                    variant="standard"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleAddProject}
                    aria-label="add new project"
                >
                    Add Project
                </Button>
            </Stack>
        </>
    );
};

export default NewProjectForm;
