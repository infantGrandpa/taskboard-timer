import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNewProject from "./components/projects/CreateNewProject";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import Navbar from "./components/Navbar";
import ProjectPage from "./components/projects/ProjectPage";
import HomePage from "./components/HomePage";
import NewTasksPage from "./components/tasks/NewTasksPage";
import NewSprintPage from "./components/sprints/NewSprintPage";
import EditSprintPage from "./components/sprints/EditSprintPage";
import SprintPrioritizePage from "./components/sprints/SprintPrioritizePage";
import { SprintTaskProvider } from "./providers/SprintTaskProvider";

declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            mode: string;
        };
    }
}

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    useEffect(() => {
        const splashScreen = document.querySelector("splash-screen");
        if (splashScreen) {
            splashScreen.remove;
        }
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar />
                    <Container maxWidth="xl" sx={{ pt: 3 }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/new-project"
                                element={<CreateNewProject />}
                            />
                            <Route
                                path="/projects/:id"
                                element={<ProjectPage />}
                            />
                            <Route
                                path="/projects/:id/new-tasks"
                                element={<NewTasksPage />}
                            />
                            <Route
                                path="/projects/:id/new-sprint"
                                element={<NewSprintPage />}
                            />
                            <Route
                                path="/projects/:id/sprints/:sprintId"
                                element={<EditSprintPage />}
                            />
                            <Route
                                path="/projects/:id/sprints/:sprintId/prioritize"
                                element={
                                    <SprintTaskProvider>
                                        <SprintPrioritizePage />
                                    </SprintTaskProvider>
                                }
                            />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
