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
import routes from "./constants/routes";
import ViewSprintPage from "./components/sprints/ViewSprintPage";

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
                            <Route
                                path={routes.home()}
                                element={<HomePage />}
                            />
                            <Route
                                path={routes.newProject()}
                                element={<CreateNewProject />}
                            />
                            <Route
                                path={routes.project(":id")}
                                element={<ProjectPage />}
                            />
                            <Route
                                path={routes.newTasks(":id")}
                                element={<NewTasksPage />}
                            />
                            <Route
                                path={routes.newSprint(":id")}
                                element={<NewSprintPage />}
                            />
                            <Route
                                path={routes.editSprint(":id", ":sprintId")}
                                element={<EditSprintPage />}
                            />
                            <Route
                                path={routes.prioritizeTasks(
                                    ":id",
                                    ":sprintId"
                                )}
                                element={<SprintPrioritizePage />}
                            />
                            <Route
                                path={routes.sprint(":id", ":sprintId")}
                                element={<ViewSprintPage />}
                            />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
