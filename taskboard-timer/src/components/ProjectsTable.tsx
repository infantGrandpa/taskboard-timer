import { Button, CircularProgress } from "@mui/material";
import DynamicTable from "./DynamicTable";
import AddIcon from "@mui/icons-material/Add";
import ErrorMessage from "./ErrorMessage";
import useProjects from "../hooks/useProjects";

const ProjectsTable = () => {
    const { data, isLoading, error, refetch } = useProjects();

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
            refetch();
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
            {isLoading && <CircularProgress />}
            {error && <ErrorMessage message={error} />}

            {data && <DynamicTable data={data} columns={projectsColumns} />}
            <Button
                variant="contained"
                onClick={addNewProject}
                startIcon={<AddIcon />}
            >
                Add New Project
            </Button>
        </>
    );
};

export default ProjectsTable;
