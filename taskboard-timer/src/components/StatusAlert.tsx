import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Slide, { SlideProps } from "@mui/material/Slide";

type StatusType = "success" | "info" | "warning" | "error";

interface Props {
    status: string | undefined;
    message: string | undefined;
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="right" />;
}

export const StatusAlert = ({ status, message }: Props) => {
    const [open, setOpen] = useState(false);

    const statusIsValid =
        status?.toLowerCase() && isOfTypeStatus(status.toLowerCase());
    const severity = statusIsValid
        ? (status?.toLowerCase() as StatusType)
        : "warning";

    if (!statusIsValid) {
        console.error("UNDEFINED OR INVALID STATUS");
    }

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

function isOfTypeStatus(status: string): status is StatusType {
    return ["success", "info", "warning", "error"].includes(status);
}
