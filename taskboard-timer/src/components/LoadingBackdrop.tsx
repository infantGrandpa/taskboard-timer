import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = () => {
    return (
        <Backdrop open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingBackdrop;
