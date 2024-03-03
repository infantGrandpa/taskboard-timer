import { useState } from "react";
import { Project } from "../hooks/useProjects";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { add } from "date-fns";

interface Props {
    project?: Project;
}

const ProjectForm = ({ project }: Props) => {
    const [projectName, setProjectName] = useState(project ? project.name : "");
    const [description, setDescription] = useState(
        project ? project.description : ""
    );
    const [client, setClient] = useState(project ? project.client : "");
    const [startDate, setStartDate] = useState<Date | null>(
        project ? project.start_date : new Date()
    );
    const [endDate, setEndDate] = useState<Date | null>(
        project ? project.end_date : add(new Date(), { months: 1 })
    );

    return (
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
    );
};

export default ProjectForm;
