import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { addProject, editProject } from "../../services/projectService";
import { Project, ProjectCreationData } from "../../constants/projects";

interface Props {
    project?: Project;
    type: "new" | "edit";
    onSave?: (projectId?: any) => void;
}

const ProjectForm = ({ project: originalProject, type, onSave }: Props) => {
    const [project, setProject] = useState({
        name: originalProject ? originalProject.name : "",
        description: originalProject ? originalProject.description : "",
        client: originalProject ? originalProject.client : "",
        start_date: originalProject ? originalProject.start_date : new Date(),
        end_date: originalProject
            ? originalProject.end_date
            : add(new Date(), { months: 1 }),
    } as Project);

    const clearForm = () => {
        setProject({
            ...project,
            name: "",
            description: "",
            client: "",
            start_date: new Date(),
            end_date: add(new Date(), { months: 1 }),
        });
    };

    const handleSave = async () => {
        if (type === "new") {
            saveNewProject();
        } else {
            saveEditedProject();
        }
    };

    const saveNewProject = async () => {
        const projectData: ProjectCreationData = {
            name: project.name,
            description: project.description,
            client: project.client,
            start_date: project.start_date,
            end_date: project.end_date,
        };
        try {
            const response = await addProject(projectData);
            onSave?.(response.data.id);
        } catch (error) {
            console.error("Error adding new project: ", error);
        }
    };

    const saveEditedProject = async () => {
        if (!originalProject) {
            return;
        }

        const editedProjectData = {
            name: project.name,
            description: project.description,
            client: project.client,
            start_date: project.start_date,
            end_date: project.end_date,
        } as ProjectCreationData;

        await editProject(originalProject, editedProjectData);
        onSave?.();
    };

    return (
        <>
            <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
                <TextField
                    id="project-name-field"
                    label="Project Name"
                    variant="filled"
                    value={project.name}
                    onChange={(e) =>
                        setProject({ ...project, name: e.target.value })
                    }
                    autoComplete="off"
                />
                <TextField
                    id="description-field"
                    label="Description"
                    multiline
                    minRows={2}
                    maxRows={5}
                    variant="filled"
                    value={project.description}
                    onChange={(e) =>
                        setProject({ ...project, description: e.target.value })
                    }
                    autoComplete="off"
                />
                <TextField
                    id="client-field"
                    label="Client"
                    variant="filled"
                    value={project.client}
                    onChange={(e) =>
                        setProject({ ...project, client: e.target.value })
                    }
                    autoComplete="off"
                />
                <Stack direction="row" spacing={12}>
                    <DatePicker
                        value={project.start_date}
                        onChange={(e) => {
                            setProject({ ...project, start_date: e });
                        }}
                    />
                    <DatePicker
                        value={project.end_date}
                        onChange={(e) => {
                            setProject({ ...project, end_date: e });
                        }}
                    />
                </Stack>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
            >
                {type === "new" && (
                    <Button
                        variant="outlined"
                        onClick={clearForm}
                        aria-label="clear form"
                        color="error"
                        startIcon={<CancelIcon />}
                    >
                        Clear Form
                    </Button>
                )}
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Stack>
        </>
    );
};

export default ProjectForm;
