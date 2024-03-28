import { Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addSprint } from "../../services/sprintService";
import { useState } from "react";
import { add } from "date-fns";
import NumberInput from "../NumberInput";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { SprintCreationData } from "../../constants/sprints";

interface Props {
    projectId: number;
}

const NewSprintForm = ({ projectId }: Props) => {
    const [sprintData, setSprintData] = useState<SprintCreationData>({
        project_id: projectId,
        name: `New Sprint for Project ${projectId}`,
        total_hours: 20,
        completed_hours: 0,
        start_date: new Date(),
        end_date: add(new Date(), { weeks: 2 }),
    } as SprintCreationData);

    const navigate = useNavigate();

    const handleSaveSprint = async () => {
        try {
            const response = await addSprint(sprintData);
            console.log(`New sprint created: ${response.id}`);
            navigate(`/projects/${projectId}/sprints/${response.id}`);
        } catch (error) {
            console.error("Error adding new sprint: ", error);
        }
    };

    const resetForm = () => {
        setSprintData({
            ...sprintData,
            name: `New Sprint for Project ${projectId}`,
            total_hours: 20,
            start_date: new Date(),
            end_date: add(new Date(), { weeks: 2 }),
        });
        console.log("Clearing form...");
    };

    return (
        <Stack direction="column" spacing={2}>
            <TextField
                id="sprint-name"
                label="Sprint Name"
                variant="filled"
                value={sprintData.name}
                onChange={(event) =>
                    setSprintData({
                        ...sprintData,
                        name: event.target.value,
                    })
                }
            />
            <NumberInput
                id="sprint-total-hours"
                label="Total Hours"
                initialValue={sprintData.total_hours}
                onChange={(newValue) =>
                    setSprintData({ ...sprintData, total_hours: newValue })
                }
            />

            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <DatePicker
                    value={sprintData.start_date}
                    onChange={(e) => {
                        setSprintData({ ...sprintData, start_date: e });
                    }}
                />

                <DatePicker
                    value={sprintData.end_date}
                    onChange={(e) => {
                        setSprintData({ ...sprintData, end_date: e });
                    }}
                />
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
            >
                <Button
                    variant="outlined"
                    onClick={resetForm}
                    aria-label="Reset form"
                    color="error"
                    startIcon={<CancelIcon />}
                >
                    Reset Form
                </Button>

                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSprint}
                >
                    Save
                </Button>
            </Stack>
        </Stack>
    );
};

export default NewSprintForm;
