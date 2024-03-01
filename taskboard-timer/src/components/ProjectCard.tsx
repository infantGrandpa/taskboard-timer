import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { Project } from "../hooks/useProjects";
import DeleteProjectButton from "./DeleteProjectButton";

interface Props {
    project: Project;
    variant?: string;
}

const ProjectCard = ({ project, variant }: Props) => {
    const isFeatured = variant === "featured";

    return (
        <Card sx={{ my: 1.5, ...(isFeatured && { height: "95%" }) }}>
            <CardContent>
                <Typography variant={isFeatured ? "h4" : "h5"} component="div">
                    {project.name}
                </Typography>
                <Typography variant="subtitle1">{project.client}</Typography>
                <Typography variant="body2">{project.description}</Typography>
                {project.start_date && (
                    <Typography variant="caption">
                        {project.start_date.toDateString()}
                        {project.end_date && project.end_date.toDateString()}
                    </Typography>
                )}
            </CardContent>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ ...(isFeatured && { mt: 38 }) }}
            >
                <CardActions>
                    <Button
                        disabled
                        size={isFeatured ? "medium" : "small"}
                        disableElevation
                    >
                        Open Project
                    </Button>
                    <DeleteProjectButton project={project} />
                </CardActions>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ pr: 1 }}
                >
                    {project.id}
                </Typography>
            </Stack>
        </Card>
    );
};

export default ProjectCard;
