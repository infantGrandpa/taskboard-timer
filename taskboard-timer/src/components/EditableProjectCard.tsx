import { useState } from "react";
import { Project } from "../hooks/useProjects";
import ErrorMessage from "./ErrorMessage";
import {
    Card,
    CardActions,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DateRange from "./DateRange";
import DeleteProjectButton from "./DeleteProjectButton";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ProjectForm from "./ProjectForm";

interface Props {
    project: Project;
}

const EditableProjectCard = ({ project }: Props) => {
    if (!project) {
        return <ErrorMessage message="No Project!" />;
    }

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    let cardContent = null;
    let cardActions = null;
    if (isEditing) {
        cardContent = <ProjectForm project={project} type="new" />;
        cardActions = (
            <>
                <IconButton
                    aria-label="edit project"
                    onClick={() => setIsEditing(false)}
                >
                    <CancelIcon />
                </IconButton>
                <IconButton
                    aria-label="edit project"
                    onClick={() => setIsEditing(false)}
                >
                    <SaveIcon />
                </IconButton>
            </>
        );
    } else {
        cardContent = (
            <>
                <Typography variant="h2">{project.name}</Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    sx={{ pb: 1 }}
                >
                    <Typography variant="subtitle1">
                        {project.client}
                    </Typography>
                    <DateRange
                        startDate={project.start_date}
                        endDate={project.end_date}
                        variant="subtitle2"
                    />
                </Stack>
                <Typography variant="body1">{project.description}</Typography>
            </>
        );
        cardActions = (
            <>
                <IconButton
                    aria-label="edit project"
                    onClick={() => setIsEditing(true)}
                >
                    <EditIcon />
                </IconButton>
            </>
        );
    }

    return (
        <Card>
            <CardContent>
                {cardContent}
                <Typography variant="caption" display="block" sx={{ pt: 3 }}>
                    Project ID: {project.id}
                </Typography>
            </CardContent>
            <CardActions>
                {cardActions}
                <DeleteProjectButton
                    project={project}
                    onDeleteSuccess={() => navigate("/")}
                />
            </CardActions>
        </Card>
    );
};

export default EditableProjectCard;
