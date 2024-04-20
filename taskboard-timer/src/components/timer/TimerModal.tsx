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
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const TimerModal = ({ isOpen, onClose }: Props) => {
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formatTimeLeft = () => {
        // Convert time left into minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        // Pad with zeros if necessary
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
                    <Button startIcon={<PauseIcon />} variant="contained">
                        Pause
                    </Button>
                    <Button
                        startIcon={<StopIcon />}
                        variant="outlined"
                        color="warning"
                    >
                        Stop
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>
    );
};

export default TimerModal;
