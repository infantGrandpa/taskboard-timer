import { Button } from "@mui/material";
import DynamicTable from "./DynamicTable";
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
            console.log(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const projectsColumns = [
        { field: "ID", label: "ID" },
        { field: "name", label: "Project Name" },
    ];
    return (
        <>
            <Button
                variant="contained"
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
