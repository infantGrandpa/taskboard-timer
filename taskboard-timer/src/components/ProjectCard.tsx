import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { Project } from "../hooks/useProjects";

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
                    {project.name}{" "}
                </Typography>
                <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed quam nec erat varius molestie.{" "}
                    {/* {project.description} */}{" "}
                </Typography>
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
