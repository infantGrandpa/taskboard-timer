import "./App.css";

import { Container, Stack } from "@mui/material";
import ProjectsGrid from "./components/ProjectsGrid";

function App() {
    return (
        <Container maxWidth="xl">
            <Stack spacing={2} justifyContent="center" alignItems="center">
                {/* <Count /> */}
                <ProjectsGrid />
            </Stack>
        </Container>
    );
}

export default App;
