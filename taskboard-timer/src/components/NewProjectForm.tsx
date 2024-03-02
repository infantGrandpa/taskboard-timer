import { Button, Container, Fab, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ProjectCreationData, addProject } from "../services/projectService";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const NewProjectForm = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(
        add(new Date(), { months: 1 })
    );

    const navigate = useNavigate();

    const handleAddProject = async () => {
        const projectData: ProjectCreationData = {
            name: projectName,
            description: description,
            client: client,
            start_date: startDate,
            end_date: endDate,
        };
        try {
            await addProject(projectData);
            navigate("/");
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    const clearForm = async () => {
        setProjectName("");
        setDescription("");
        setClient("");
        setStartDate(new Date());
        setEndDate(add(new Date(), { months: 1 }));
    };

    return (
        <Container maxWidth="sm">
            <Stack direction="row" justifyContent="space-between">
                <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    aria-label="home"
                >
                    Home
                </Button>
                <Button
                    variant="outlined"
                    onClick={clearForm}
                    aria-label="clear form"
                    color="error"
                    startIcon={<ClearIcon />}
                >
                    Clear Form
                </Button>
            </Stack>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                }}
                onClick={handleAddProject}
                aria-label="add new project"
            >
                Complete
                <CheckIcon sx={{ ml: 1 }} />
            </Fab>
            <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
                <TextField
                    id="project-name-field"
                    label="Project Name"
                    variant="standard"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    autoComplete="off"
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
                    autoComplete="off"
                />
                <TextField
                    id="client-field"
                    label="Client"
                    variant="standard"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    autoComplete="off"
                />
                <Stack direction="row" spacing={12}>
                    <DatePicker
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e);
                        }}
                    />
                    <DatePicker
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(e);
                        }}
                    />
                </Stack>
            </Stack>
        </Container>
    );
};

export default NewProjectForm;
