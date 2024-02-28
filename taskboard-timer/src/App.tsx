import "./App.css";

import { Container, Stack } from "@mui/material";
import Count from "./components/Count";
import ProjectsTable from "./components/ProjectsTable";

function App() {
    return (
        <Container maxWidth="sm">
            <Stack spacing={2} justifyContent="center" alignItems="center">
                {/* <Count /> */}
                <ProjectsTable />
            </Stack>
        </Container>
    );
}

export default App;
