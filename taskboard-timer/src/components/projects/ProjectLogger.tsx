import { useEffect } from "react";
import { ProjectQuery } from "../../hooks/useProjects";
import { useProjectContext } from "../../providers/ProjectProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

const ProjectLogger = () => {
    const { data, isLoading, error, projectQuery, setProjectQuery } =
        useProjectContext();

    const handleQueryChange = () => {
        if (projectQuery?.id) {
            setProjectQuery({ id: null } as ProjectQuery);
        } else {
            setProjectQuery({ id: 17 } as ProjectQuery);
        }
    };

    useEffect(() => {
        setProjectQuery({ id: 17 } as ProjectQuery);
    }, []);

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message="error" />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 5 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Typography variant="h5">
                    {projectQuery?.id
                        ? `Project ${projectQuery.id}`
                        : "No Project Filter"}
                </Typography>
                <Button
                    onClick={handleQueryChange}
                    variant="contained"
                    color="secondary"
                >
                    Toggle Query
                </Button>
            </Stack>

            <List
                dense
                sx={{ backgroundColor: "secondary.dark", borderRadius: 1 }}
            >
                {data &&
                    data.map((project) => (
                        <ListItem key={project.id}>
                            <ListItemText>
                                {project.name.length > 0
                                    ? `${project.name} (${project.id})`
                                    : `Project ${project.id}`}
                            </ListItemText>
                        </ListItem>
                    ))}
            </List>
        </Stack>
    );
};

export default ProjectLogger;
