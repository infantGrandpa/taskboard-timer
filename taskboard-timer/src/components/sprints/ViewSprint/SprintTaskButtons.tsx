import { Box, CardActions, IconButton, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    SprintTask,
    SprintTaskCreationData,
} from "../../../constants/sprintTasks";
import {
    getNextStatus,
    getPreviousStatus,
} from "../../../constants/statusLabels";
import { editSprintTask } from "../../../services/sprintService";

interface Props {
    sprintTask: SprintTask;
}

const SprintTaskButtons = ({ sprintTask }: Props) => {
    console.log("IN BUTTONS");
    console.log(sprintTask);

    const handleChangeStatus = (newStatus: string | null) => {
        if (!newStatus) {
            console.error(`ERROR: Status ${newStatus} is invalid.`);
        }

        const newSprintTaskData = {
            sprint_id: sprintTask.sprint_id,
            task_id: sprintTask.task_id,
            priority: sprintTask.priority,
            status: newStatus,
        } as SprintTaskCreationData;

        console.log("newSprintTaskData");
        console.log(newSprintTaskData);

        editSprintTask(newSprintTaskData);
    };

    return (
        <CardActions>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    backgroundColor: "rgba(255, 255, 255, .07)",
                    margin: "auto",
                }}
            >
                <IconButton
                    onClick={() =>
                        handleChangeStatus(getPreviousStatus(sprintTask.status))
                    }
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>

                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <IconButton>
                        <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Stack>

                <IconButton
                    onClick={() =>
                        handleChangeStatus(getNextStatus(sprintTask.status))
                    }
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </CardActions>
    );
};

export default SprintTaskButtons;
