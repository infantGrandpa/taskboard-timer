import { useState } from "react";
import { Project } from "../hooks/useProjects";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";

interface Props {
    project?: Project;
}

const ProjectForm = ({ project: thisProject }: Props) => {
    const [project, setProject] = useState({
        name: thisProject ? thisProject.name : "",
        description: thisProject ? thisProject.description : "",
        client: thisProject ? thisProject.client : "",
        start_date: thisProject ? thisProject.start_date : new Date(),
        end_date: thisProject
            ? thisProject.end_date
            : add(new Date(), { months: 1 }),
    } as Project);

    return (
        <Stack direction="column" spacing={2} sx={{ pt: 2 }}>
            <TextField
                id="project-name-field"
                label="Project Name"
                variant="standard"
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
                variant="standard"
                value={project.description}
                onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                }
                autoComplete="off"
            />
            <TextField
                id="client-field"
                label="Client"
                variant="standard"
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
    );
};

export default ProjectForm;
