import { Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import routes from "../constants/routes";
import { useTimerContext } from "../providers/TimerProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const Navbar = () => {
    const {
        timerActive,
        pauseTimer,
        unpauseTimer,
        formattedTimeLeft,
        currentTask,
    } = useTimerContext();

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            component={Link}
                            to={routes.home()}
                            variant="text"
                            aria-label="home"
                            startIcon={<HomeIcon />}
                            size="large"
                        >
                            Home
                        </Button>
                    </Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Button
                            variant="text"
                            disabled={!currentTask}
                            startIcon={
                                timerActive ? <PauseIcon /> : <PlayArrowIcon />
                            }
                            onClick={timerActive ? pauseTimer : unpauseTimer}
                        >
                            {formattedTimeLeft}
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
