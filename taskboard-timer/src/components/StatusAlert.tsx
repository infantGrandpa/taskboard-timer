import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

type StatusType = "success" | "info" | "warning" | "error";

interface Props {
    status: string | undefined;
    message: string | undefined;
}

export const StatusAlert = ({ status, message }: Props) => {
    const [open, setOpen] = useState(false);

    let severity = status as StatusType;
    if (status === undefined || !isOfTypeStatus(status)) {
        console.error("UNDEFINED OR INVALID STATUS");
        severity = "warning";
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

function isOfTypeStatus(status: string): status is StatusType {
    return ["success", "info", "warning", "error"].includes(status);
}
