import { Alert } from "@mui/material";

interface Props {
    message?: string;
}

const ErrorMessage = ({ message }: Props) => {
    if (!message) {
        message = "Unknown Error";
    }

    return <Alert severity="error">{message}</Alert>;
};

export default ErrorMessage;
