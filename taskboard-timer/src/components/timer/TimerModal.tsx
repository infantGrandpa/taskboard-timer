import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import MinimizeIcon from "@mui/icons-material/Minimize";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TimerTaskSelection from "./TimerTaskSelection";
import { useTimerContext } from "../../providers/TimerProvider";
import { useState } from "react";
import EditTimerModal from "./EditTimerModal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TimerModal = ({ isOpen, onClose }: Props) => {
    const {
        timeLeft,
        formattedTimeLeft,
        timerActive,
        unpauseTimer,
        pauseTimer,
        resetTimer,
        currentTask,
    } = useTimerContext();

    const [openEditTimer, setOpenEditTimer] = useState<boolean>(false);

    const handleOpenEditModal = () => {
        resetTimer();
        setOpenEditTimer(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditTimer(false);
    };

    const playerButtonDisabled = !currentTask || timeLeft == 0;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{ minHeight: "50%" }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                }}
            >
                <MinimizeIcon />
            </IconButton>
            <Stack direction="column" alignItems="center" sx={{ pb: 2 }}>
                <DialogTitle>
                    {timerActive ? "Timer is Active" : "Set Timer"}
                </DialogTitle>
                <DialogContent>
                    <Stack
                        sx={{
                            backgroundColor: "#121212",
                            p: 2,
                            borderRadius: "6px",
                        }}
                    >
                        {openEditTimer && (
                            <EditTimerModal
                                isOpen={openEditTimer}
                                onClose={handleCloseEditModal}
                            />
                        )}
                        <Typography
                            variant="h1"
                            textAlign="center"
                            component="p"
                        >
                            {formattedTimeLeft}
                        </Typography>
                        {!timerActive && (
                            <Button
                                variant="text"
                                size="small"
                                onClick={handleOpenEditModal}
                            >
                                Edit Timer
                            </Button>
                        )}
                    </Stack>
                    <TimerTaskSelection timerActive={timerActive} />
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={
                            timerActive ? <PauseIcon /> : <PlayArrowIcon />
                        }
                        variant="contained"
                        disabled={playerButtonDisabled}
                        onClick={timerActive ? pauseTimer : unpauseTimer}
                    >
                        {timerActive ? "Pause" : "Play"}
                    </Button>
                    <Button
                        startIcon={<StopIcon />}
                        variant="outlined"
                        color="warning"
                        onClick={resetTimer}
                    >
                        Stop
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>
    );
};

export default TimerModal;
