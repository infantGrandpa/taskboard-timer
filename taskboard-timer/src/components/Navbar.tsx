import { Link } from "react-router-dom";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        component={Link}
                        to="/"
                        variant="text"
                        aria-label="home"
                        startIcon={<HomeIcon />}
                        size="large"
                    >
                        Home
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
