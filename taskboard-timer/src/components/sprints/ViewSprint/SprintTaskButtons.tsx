import { Box, CardActions, IconButton, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SprintTask } from "../../../constants/sprintTasks";
import {
    getNextStatus,
    getPreviousStatus,
} from "../../../constants/statusLabels";

interface Props {
    sprintTask: SprintTask;
}

const SprintTaskButtons = ({ sprintTask }: Props) => {
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
                    onClick={() => getPreviousStatus(sprintTask.status)}
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

                <IconButton onClick={() => getNextStatus(sprintTask.status)}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </CardActions>
    );
};

export default SprintTaskButtons;
