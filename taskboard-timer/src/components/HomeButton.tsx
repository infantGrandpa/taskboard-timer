import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export const HomeButton = () => {
    return (
        <Button
            component={Link}
            to="/"
            variant="outlined"
            aria-label="home"
            startIcon={<HomeIcon />}
        >
            Home
        </Button>
    );
};
