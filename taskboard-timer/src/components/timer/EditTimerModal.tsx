import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import NumberInput from "../NumberInput";
import { useTimerContext } from "../../providers/TimerProvider";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const EditTimerModal = ({ isOpen, onClose }: Props) => {
    const { timeLeft } = useTimerContext();

    const initialMinutes = timeLeft / 60;
    const initialSeconds = timeLeft % 60;

    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    const handleSave = () => {};

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Edit Timer Length</DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <NumberInput
                        id="minutes"
                        label="Minutes"
                        min={0}
                        initialValue={initialMinutes}
                        onChange={(newValue) => setMinutes(newValue)}
                    />
                    <NumberInput
                        id="seconds"
                        label="Seconds"
                        min={0}
                        max={59}
                        initialValue={initialSeconds}
                        onChange={(newValue) => setSeconds(newValue)}
                    />
                </Stack>

                <Typography>
                    {minutes}:{seconds}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTimerModal;
