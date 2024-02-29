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
}

const ProjectCard = ({ project }: Props) => {
    return (
        <Card sx={{ width: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
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
            >
                <CardActions>
                    <Button disabled size="small" disableElevation>
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
