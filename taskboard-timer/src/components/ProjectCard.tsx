import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { Project } from "../hooks/useProjects";
import { Link } from "react-router-dom";
import DateRange from "./DateRange";

interface Props {
    project: Project;
    variant?: string;
    onDelete: () => void;
}

const ProjectCard = ({ project, variant }: Props) => {
    const isFeatured = variant === "featured";

    return (
        <Card sx={{ my: 1.5, ...(isFeatured && { height: "95%" }) }}>
            <CardActionArea
                component={Link}
                to={`/projects/${project.id}`}
                sx={{ ...(isFeatured && { height: "100%" }) }}
            >
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant={isFeatured ? "h4" : "h5"}
                            component="div"
                        >
                            {project.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {project.id}
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1" color="text.secondary">
                        {project.client}
                    </Typography>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                    <DateRange
                        startDate={project.start_date}
                        endDate={project.end_date}
                        variant="subtitle2"
                        sx={{ pt: 2 }}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
