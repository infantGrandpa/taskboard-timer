import {
    Card,
    CardActionArea,
    CardContent,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DateRange from "../DateRange";
import { Project } from "../../constants/projects";
import routes from "../../constants/routes";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProjectContext } from "../../providers/ProjectProvider";
import ConfirmationDialog from "../ConfirmationDialog";

interface Props {
    project: Project;
    variant?: "featured";
}

const ProjectCard = ({ project, variant }: Props) => {
    const { deleteProject } = useProjectContext();
    const [openDialog, setOpenDialog] = useState(false);

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

    const handleDelete = () => {
        deleteProject(project).catch(console.error);
        handleCloseDialog();
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        handleCloseContextMenu();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            style={{ display: "flex", width: "100%" }}
        >
            <ConfirmationDialog
                isOpen={openDialog}
                onClose={handleCloseDialog}
                dialogTitle={`Delete "${project.name}" Project?`}
                dialogText={`Are you sure you want to delete the "${project.name}"
                        project? This action cannot be undone.`}
                confirmButtonText="Delete Project"
                onConfirm={handleDelete}
                confirmButtonColor="error"
            />
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
                <MenuItem onClick={handleOpenDialog}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText>Delete Project</ListItemText>
                </MenuItem>
            </Menu>
            <Card sx={{ display: "flex", width: "100%" }}>
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
