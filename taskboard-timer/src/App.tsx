import "./App.css";

import { Container, Stack } from "@mui/material";
import ProjectsTable from "./components/ProjectsTable";

function App() {
    return (
        <Container maxWidth="xl">
            <Stack spacing={2} justifyContent="center" alignItems="center">
                {/* <Count /> */}
                <ProjectsTable />
            </Stack>
        </Container>
    );
}

export default App;
