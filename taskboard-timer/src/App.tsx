import { useState } from "react";
import "./App.css";
import { Command } from "@tauri-apps/api/shell";

import {
    Container,
    Typography,
    Button,
    Card,
    Stack,
    CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function App() {
    const [count, setCount] = useState(10);

    const incrementCount = async () => {
        try {
            const command = Command.sidecar("bin/api/rand_gen", [
                count.toString(),
            ]);
            const output = await command.execute();
            const data = JSON.parse(output.stdout);
            setCount(data.count);
        } catch (error) {
            console.error("Error incrementing count:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h1">Increase the Count!</Typography>
                <Button
                    variant="contained"
                    onClick={incrementCount}
                    endIcon={<AddIcon />}
                >
                    Increase
                </Button>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h6">Count</Typography>
                        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                            {count}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}

export default App;
