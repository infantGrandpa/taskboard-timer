import {
    Card,
    CardActionArea,
    CardContent,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    SxProps,
    Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import DateRange from "../DateRange";
import { Project } from "../../constants/projects";
import routes from "../../constants/routes";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "../../services/projectService";

interface Props {
    project: Project;
    variant?: "featured";
    sx?: SxProps;
}

const ProjectCard = ({ project, variant, sx }: Props) => {
    const isFeatured = variant === "featured";
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : null
        );
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleDelete = async () => {
        await deleteProject(project);
        handleCloseContextMenu();
    };

    return (
        <div onContextMenu={handleContextMenu}>
            <Menu
                open={contextMenu !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>Delete Project</ListItemText>
                </MenuItem>
            </Menu>
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
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
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
        </div>
    );
};

export default ProjectCard;
