import { IconButton, Paper, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { SprintCreationData, editSprint } from "../../services/sprintService";
import { useEffect, useState } from "react";
import NumberInput from "../NumberInput";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useSprintContext } from "../../providers/SprintProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { Sprint } from "../../hooks/useSprints";

const EditSprintForm = () => {
    const { data, isLoading, error } = useSprintContext();

    const sprint = data ? data[0] : null;

    const getSprintData = (sprint: Sprint | null) => {
        if (!sprint || sprint.project_id === null) {
            return {
                project_id: -1,
                name: "",
                total_hours: 0,
                completed_hours: 0,
                start_date: null,
                end_date: null,
            } as SprintCreationData;
        }

        return {
            project_id: sprint.project_id,
            name: sprint.name,
            total_hours: sprint.total_hours,
            completed_hours: sprint.completed_hours,
            start_date: sprint.start_date,
            end_date: sprint.end_date,
        } as SprintCreationData;
    };

    useEffect(() => {
        if (data && data[0]) {
            setSprintData(getSprintData(data[0]));
        }
    }, [data]);

    const [sprintData, setSprintData] = useState<SprintCreationData>(
        getSprintData(data ? data[0] : null)
    );

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!sprint) {
        return <ErrorMessage message="ERROR: INVALID SPRINT" />;
    }

    const handleSaveSprint = async () => {
        try {
            console.log("SENDING EDIT SPRINT REQUEST");
            console.log("SPRINT");
            console.log(sprint);
            console.log("SPRINT DATA");
            console.log(sprintData);
            const response = await editSprint(sprint, sprintData);
            console.log(`SPRINT EDITED.`);
            console.log(response);
        } catch (error) {
            console.error("Error adding new sprint: ", error);
        }
    };

    const resetForm = () => {
        setSprintData({
            ...sprintData,
            name: sprint.name,
            total_hours: sprint.total_hours,
            start_date: sprint.start_date,
            end_date: sprint.end_date,
        });
        console.log("Clearing form...");
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
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

                <DatePicker
                    label="Start Date"
                    value={sprintData.start_date}
                    onChange={(e) => {
                        setSprintData({ ...sprintData, start_date: e });
                    }}
                />

                <DatePicker
                    label="End Date"
                    value={sprintData.end_date}
                    onChange={(e) => {
                        setSprintData({ ...sprintData, end_date: e });
                    }}
                />

                <IconButton onClick={resetForm} aria-label="Clear Changes">
                    <CancelIcon />
                </IconButton>
                <IconButton
                    onClick={handleSaveSprint}
                    aria-label="save changes"
                    color="primary"
                >
                    <SaveIcon />
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default EditSprintForm;
