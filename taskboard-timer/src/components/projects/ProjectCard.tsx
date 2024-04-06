import {
    Card,
    CardActionArea,
    CardContent,
    Stack,
    SxProps,
    Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import DateRange from "../DateRange";
import { Project } from "../../constants/projects";
import routes from "../../constants/routes";

interface Props {
    project: Project;
    variant?: "featured";
    sx?: SxProps;
}

const ProjectCard = ({ project, variant, sx }: Props) => {
    const isFeatured = variant === "featured";

    return (
        <Card
            sx={{
                ...sx,
                display: "flex",
                width: "100%",
            }}
        >
            <CardActionArea
                component={Link}
                to={routes.project(project.id)}
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
                    <Typography variant="subtitle2" sx={{ pt: 2 }}>
                        <DateRange
                            startDate={project.start_date}
                            endDate={project.end_date}
                        />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
