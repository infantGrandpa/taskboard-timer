import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectsGrid from "./components/projects/ProjectsGrid";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProjectForm from "./components/projects/NewProjectForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import ProjectView from "./components/projects/ProjectView";
import Navbar from "./components/Navbar";
import { ProjectProvider } from "./providers/ProjectProvider";

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
                                path="/"
                                element={
                                    <ProjectProvider>
                                        <ProjectsGrid />
                                    </ProjectProvider>
                                }
                            />
                            <Route
                                path="/new-project"
                                element={<NewProjectForm />}
                            />
                            <Route
                                path="/projects/:id"
                                element={
                                    <ProjectProvider>
                                        <ProjectView />
                                    </ProjectProvider>
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
