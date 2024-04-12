import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface Props {
    isOpen: boolean;
    dialogTitle: string;
    dialogText: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonColor?: ButtonProps["color"];
}

const ConfirmationDialog = ({
    isOpen,
    dialogTitle,
    dialogText,
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    onClose,
    onConfirm,
    confirmButtonColor: buttonColor = "primary",
}: Props) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}

            <DialogContent>
                <DialogContentText>{dialogText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    {cancelButtonText}
                </Button>
                <Button color={buttonColor} onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
