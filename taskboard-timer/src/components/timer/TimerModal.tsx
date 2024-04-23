import {
    Box,
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
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TimerModal = ({ isOpen, onClose }: Props) => {
    const secsOnTimer = 20 * 60; //20 minutes
    const [timeLeft, setTimeLeft] = useState(secsOnTimer);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (!timerActive) {
            return;
        }

        if (!timeLeft) {
            setTimerActive(false);
            return;
        }

        //Subtract a second from time left
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, timerActive]);

    const formatTimeLeft = () => {
        // Convert time left into minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        // Pad with zeros if necessary (turn 1:9 into 1:09)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const unpauseTimer = () => {
        setTimerActive(true);
    };

    const pauseTimer = () => {
        setTimerActive(false);
    };

    const resetTimer = () => {
        setTimeLeft(secsOnTimer);
        setTimerActive(false);
    };

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
                <DialogTitle>Timer is Active</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            backgroundColor: "#121212",
                            p: 2,
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h1" component="p">
                            {formatTimeLeft()}
                        </Typography>
                    </Box>
                    <Typography variant="h4" textAlign="center" sx={{ mt: 2 }}>
                        Current Task
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        startIcon={
                            timerActive ? <PauseIcon /> : <PlayArrowIcon />
                        }
                        variant="contained"
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
