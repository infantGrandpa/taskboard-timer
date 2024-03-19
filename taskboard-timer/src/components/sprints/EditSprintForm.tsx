import { IconButton, Paper, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { SprintCreationData, editSprint } from "../../services/sprintService";
import { useEffect, useState } from "react";
import NumberInput from "../NumberInput";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useSprintContext } from "../../providers/SprintProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import { Sprint } from "../../hooks/useSprints";
import Grid from "@mui/material/Unstable_Grid2";
import { StatusAlert } from "../StatusAlert";

const EditSprintForm = () => {
    const { data, isLoading, message, status } = useSprintContext();

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

    if (!sprint) {
        return <StatusAlert status="error" message="ERROR: INVALID SPRINT" />;
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
        <Paper elevation={3} sx={{ p: 1.5 }}>
            {status && <StatusAlert status={status} message={message} />}
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={0.25}
            >
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    <Grid xs={6} md={8} lg={3}>
                        <TextField
                            fullWidth
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
                    </Grid>
                    <Grid xs={6} md={4} lg={3}>
                        <NumberInput
                            id="sprint-total-hours"
                            label="Total Hours"
                            initialValue={sprintData.total_hours}
                            onChange={(newValue) =>
                                setSprintData({
                                    ...sprintData,
                                    total_hours: newValue,
                                })
                            }
                        />
                    </Grid>
                    <Grid xs={6} md={6} lg={3}>
                        <DatePicker
                            label="Start Date"
                            value={sprintData.start_date}
                            onChange={(e) => {
                                setSprintData({ ...sprintData, start_date: e });
                            }}
                        />
                    </Grid>

                    <Grid xs={6} md={6} lg={3}>
                        <DatePicker
                            label="End Date"
                            value={sprintData.end_date}
                            onChange={(e) => {
                                setSprintData({ ...sprintData, end_date: e });
                            }}
                        />
                    </Grid>
                </Grid>
                <Stack direction="column" justifyContent="space-between">
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
            </Stack>
        </Paper>
    );
};

export default EditSprintForm;
