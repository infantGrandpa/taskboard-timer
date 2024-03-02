import {
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { HomeButton } from "./HomeButton";
import { useState } from "react";
import useProjects from "../hooks/useProjects";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProjectButton from "./DeleteProjectButton";
import DateRange from "./DateRange";

const ProjectView = () => {
    let { id } = useParams();
    /* const projectQuery = { id: id ? parseInt(id, 10) : undefined }; */ //For some reason this causes infinite refresh
    const [projectQuery, setProjectQuery] = useState({
        id: id ? parseInt(id, 10) : undefined,
    });

    const navigate = useNavigate();

    const { data, isLoading, error } = useProjects(projectQuery);

    const thisProject = data ? data[0] : null;

    return (
        <>
            <HomeButton />
            <Container maxWidth="md">
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        {isLoading && <Typography>Loading...</Typography>}
                        {error && <Typography>Error: {error}</Typography>}

                        {thisProject && (
                            <>
                                <Typography variant="h2">
                                    {thisProject.name}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-end"
                                    sx={{ pb: 1 }}
                                >
                                    <Typography variant="subtitle1">
                                        {thisProject.client}
                                    </Typography>
                                    <DateRange
                                        startDate={thisProject.start_date}
                                        endDate={thisProject.end_date}
                                        variant="subtitle2"
                                    />
                                </Stack>
                                <Typography variant="body1">
                                    {thisProject.description}
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
                    {thisProject && (
                        <>
                            <CardActions>
                                <IconButton aria-label="edit project">
                                    <EditIcon />
                                </IconButton>
                                <DeleteProjectButton
                                    project={thisProject}
                                    onDeleteSuccess={() => navigate("/")}
                                />
                            </CardActions>
                        </>
                    )}
                </Card>
            </Container>
        </>
    );
};

export default ProjectView;
