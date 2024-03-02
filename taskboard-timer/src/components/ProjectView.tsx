import {
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { HomeButton } from "./HomeButton";
import { useState } from "react";
import useProjects from "../hooks/useProjects";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const ProjectView = () => {
    let { id } = useParams();
    const [projectQuery, setProjectQuery] = useState({
        id: id ? parseInt(id, 10) : undefined,
    });
    const { data, isLoading, error } = useProjects(projectQuery);

    return (
        <>
            <HomeButton />
            <Container maxWidth="md">
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        {isLoading && <Typography>Loading...</Typography>}
                        {error && <Typography>Error: {error}</Typography>}

                        {data && data[0] && (
                            <>
                                <Typography variant="h2">
                                    {data[0].name}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                    sx={{ pb: 1 }}
                                >
                                    <Typography variant="subtitle1">
                                        {data[0].client}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {format(
                                            new Date(data[0].start_date),
                                            "MMM dd, yyyy"
                                        )}
                                        &ndash;
                                        {format(
                                            new Date(data[0].end_date),
                                            "MMM dd, yyyy"
                                        )}
                                    </Typography>
                                </Stack>
                                <Typography variant="body1">
                                    {data[0].description}
                                </Typography>
                            </>
                        )}

                        <Typography
                            variant="caption"
                            display="block"
                            sx={{ pt: 3 }}
                        >
                            Project ID: {id}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="edit project">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete project">
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
};

export default ProjectView;
