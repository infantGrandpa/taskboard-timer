import { Button, CircularProgress, Stack } from "@mui/material";
import DynamicTable from "./DynamicTable";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";

type Project = {
    id: number;
    name: string;
};

const ProjectsTable = () => {
    const { data, isLoading, error, refetch } = useProjects();

    const addNewProject = async () => {
        const projectData = { name: "My New Project" };
        /* setError(undefined); */

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
            refetch();
        } catch (error) {
            console.error("Error adding new project:", error);
            /* setError("Failed to fetch projects. Please try again."); */
        }
    };

    /* const showError = () => {
        setError(undefined);
        setError("This is an error message!");
    }; */

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
            </Stack>

            {isLoading && <CircularProgress />}
            {error && <ErrorMessage message={error} />}

            {data && <DynamicTable data={data} columns={projectsColumns} />}
        </>
    );
};

export default ProjectsTable;
