import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectsGrid from "./components/ProjectsGrid";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProjectForm from "./components/NewProjectForm";

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl">
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
    );
}

export default App;
