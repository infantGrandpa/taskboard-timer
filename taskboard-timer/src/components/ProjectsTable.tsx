import { Button } from "@mui/material";
import DynamicTable from "./DynamicTable";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";

type Project = {
    id: number;
    name: string;
};

const ProjectsTable = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/projects");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const addNewProject = async () => {
        const projectData = { name: "My New Project" };

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
        }
    };

    const projectsColumns = [
        { field: "id", label: "ID" },
        { field: "name", label: "Project Name" },
    ];
    return (
        <>
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
            <DynamicTable data={projects} columns={projectsColumns} />
        </>
    );
};

export default ProjectsTable;
