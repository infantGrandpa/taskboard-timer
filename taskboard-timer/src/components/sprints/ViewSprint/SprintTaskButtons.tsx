import { Box, CardActions, IconButton, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    SprintTask,
    SprintTaskCreationData,
} from "../../../constants/sprintTasks";
import { StatusLabels } from "../../../constants/statusLabels";
import {
    getEnumKeyFromLabel,
    getNextLabel,
    getPreviousLabel,
} from "../../../utilities/labelHelper";
import { PriorityLabels } from "../../../constants/priorityLabels";
import { useSprintTaskContext } from "../../../providers/SprintTaskProvider";

interface Props {
    sprintTask: SprintTask;
}

const SprintTaskButtons = ({ sprintTask }: Props) => {
    const { updateTask } = useSprintTaskContext();

    const handleChangeStatus = (newStatus: string | null) => {
        if (!newStatus) {
            console.error(`ERROR: Status ${newStatus} is invalid.`);
            return;
        }

        const newSprintTaskData = {
            sprint_id: sprintTask.sprint_id,
            task_id: sprintTask.task_id,
            priority: sprintTask.priority,
            status: getEnumKeyFromLabel(newStatus, StatusLabels),
        } as SprintTaskCreationData;

        updateTask(newSprintTaskData).catch(console.error);
    };

    const handleChangePriority = (newPriority: string | null) => {
        if (!newPriority) {
            console.error(`ERROR: Priority ${newPriority} is invalid.`);
            return;
        }

        const newSprintTaskData = {
            sprint_id: sprintTask.sprint_id,
            task_id: sprintTask.task_id,
            priority: getEnumKeyFromLabel(newPriority, PriorityLabels),
            status: sprintTask.status,
        } as SprintTaskCreationData;

        updateTask(newSprintTaskData).catch(console.error);
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
                        handleChangeStatus(
                            getPreviousLabel(sprintTask.status, StatusLabels)
                        )
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
                    <IconButton
                        onClick={() =>
                            handleChangePriority(
                                getPreviousLabel(
                                    sprintTask.priority,
                                    PriorityLabels
                                )
                            )
                        }
                    >
                        <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            handleChangePriority(
                                getNextLabel(
                                    sprintTask.priority,
                                    PriorityLabels
                                )
                            )
                        }
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Stack>

                <IconButton
                    onClick={() =>
                        handleChangeStatus(
                            getNextLabel(sprintTask.status, StatusLabels)
                        )
                    }
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </CardActions>
    );
};

export default SprintTaskButtons;
