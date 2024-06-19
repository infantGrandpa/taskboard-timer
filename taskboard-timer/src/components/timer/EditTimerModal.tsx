import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";
import NumberInput from "../NumberInput";
import { useTimerContext } from "../../providers/TimerProvider";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const EditTimerModal = ({ isOpen, onClose }: Props) => {
    const { timeLeft, setTimerLength } = useTimerContext();

    const initialMinutes = timeLeft / 60;
    const initialSeconds = timeLeft % 60;

    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    const handleSave = () => {
        setTimerLength(minutes, seconds);
        onClose();
    };

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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTimerModal;
