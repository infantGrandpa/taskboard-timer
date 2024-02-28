import { Button, Stack } from "@mui/material";
import DynamicTable from "./DynamicTable";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

type Project = {
    id: number;
    name: string;
};

const ProjectsTable = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | undefined>();

    const fetchProjects = async () => {
        setError(undefined);
        try {
            const response = await fetch("http://127.0.0.1:5000/api/projects");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setError("Failed to fetch projects. Please try again.");
        }
    };

    const addNewProject = async () => {
        const projectData = { name: "My New Project" };
        setError(undefined);

        try {
            const response = await fetch("http://127.0.0.1:5000/add_project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            fetchProjects();
        } catch (error) {
            console.error("Error adding new project:", error);
            setError("Failed to fetch projects. Please try again.");
        }
    };

    const showError = () => {
        setError(undefined);
        setError("This is an error message!");
    };

    const projectsColumns = [
        { field: "id", label: "ID" },
        { field: "name", label: "Project Name" },
    ];
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    onClick={addNewProject}
                    startIcon={<AddIcon />}
                >
                    Add New Project
                </Button>
                <Button
                    variant="outlined"
                    onClick={fetchProjects}
                    startIcon={<RefreshIcon />}
                >
                    Fetch Projects
                </Button>
                <Button variant="outlined" onClick={showError}>
                    ERROR
                </Button>
            </Stack>

            <ErrorMessage message={error} />
            <DynamicTable data={projects} columns={projectsColumns} />
        </>
    );
};

export default ProjectsTable;
