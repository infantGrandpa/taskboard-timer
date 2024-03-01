import { Container, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProjectsGrid from "./components/ProjectsGrid";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <ProjectsGrid />
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default App;
