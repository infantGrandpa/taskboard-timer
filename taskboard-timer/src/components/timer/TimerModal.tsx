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
import Grid from "@mui/material/Unstable_Grid2";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

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
            <DialogTitle textAlign="center" sx={{ pb: 0 }}>
                {timerActive ? "Timer is Active" : "Set Timer"}
            </DialogTitle>
            <Grid container>
                <Grid xs={3}>
                    <DialogContent>
                        <Stack
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                py: "1em",
                                px: "2em",
                                borderRadius: "6px",
                            }}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<AccessAlarmIcon />}
                                fullWidth
                            >
                                20:00
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<AccessAlarmIcon />}
                                fullWidth
                            >
                                30:00
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<AccessAlarmIcon />}
                                fullWidth
                            >
                                40:00
                            </Button>
                        </Stack>
                    </DialogContent>
                </Grid>
                <Grid xs={6} alignItems="center" sx={{ pb: 2 }}>
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
                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            sx={{ width: "100%" }}
                        >
                            <Button
                                startIcon={
                                    timerActive ? (
                                        <PauseIcon />
                                    ) : (
                                        <PlayArrowIcon />
                                    )
                                }
                                variant="contained"
                                disabled={playerButtonDisabled}
                                onClick={
                                    timerActive ? pauseTimer : unpauseTimer
                                }
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
                        </Stack>
                    </DialogActions>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default TimerModal;
