import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectsGrid from "./components/ProjectsGrid";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProjectForm from "./components/NewProjectForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

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
                <Container maxWidth="xl" sx={{ pt: 3 }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ProjectsGrid />} />
                            <Route
                                path="/new-project"
                                element={<NewProjectForm />}
                            />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
