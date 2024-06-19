import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import {
    Card,
    CardActions,
    CardContent,
    Grow,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DateRange from "../DateRange";
import DeleteProjectButton from "./DeleteProjectButton";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ProjectForm from "./ProjectForm";
import { Project } from "../../constants/projects";
import routes from "../../constants/routes";

interface Props {
    project: Project;
}

const EditableProjectCard = ({ project }: Props) => {
    if (!project) {
        return <ErrorMessage message="No Project!" />;
    }

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onEditComplete = () => {
        setIsEditing(false);
        /* TO DO - update the current value of project.description after editing is complete */
    };

    return (
        <Grow in={true} timeout={200}>
            <Card>
                <CardContent>
                    {isEditing ? (
                        <ProjectForm
                            project={project}
                            type="edit"
                            onSave={onEditComplete}
                        />
                    ) : (
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
                                <Typography variant="subtitle2">
                                    <DateRange
                                        startDate={project.start_date}
                                        endDate={project.end_date}
                                    />
                                </Typography>
                            </Stack>
                            <Typography variant="body1">
                                {project.description}
                            </Typography>
                        </>
                    )}
                    <Typography
                        variant="caption"
                        display="block"
                        sx={{ pt: 3 }}
                    >
                        Project ID: {project.id}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        aria-label={isEditing ? "cancel edit" : "edit project"}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? <CancelIcon /> : <EditIcon />}
                    </IconButton>
                    <DeleteProjectButton
                        project={project}
                        onDeleteSuccess={() => navigate(routes.home())}
                    />
                </CardActions>
            </Card>
        </Grow>
    );
};

export default EditableProjectCard;
