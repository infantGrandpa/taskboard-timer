import {
    Accordion,
    AccordionSummary,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import { useSprintContext } from "../../providers/SprintProvider";
import NewSprintButton from "./NewSprintButton";
import { Sprint, SprintQuery } from "../../hooks/useSprints";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSprint } from "../../services/sprintService";
import { StatusAlert } from "../StatusAlert";

const SprintList = () => {
    const { data, isLoading, message, status, sprintQuery, setSprintQuery } =
        useSprintContext();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    const projectId = sprintQuery?.project_id;

    if (!projectId) {
        return <ErrorMessage message="No project id!" />;
    }

    const handleDeleteSprint = async (sprint: Sprint) => {
        console.log(`Deleting sprint ${sprint.id} (not really)...`);
        await deleteSprint(sprint);
    };

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={
                        <NewSprintButton
                            projectId={projectId}
                            onCreateNew={() =>
                                setSprintQuery({
                                    project_id: projectId,
                                } as SprintQuery)
                            }
                        />
                    }
                    aria-controls="sprint-list-content"
                    id="sprint-list-header"
                >
                    <Typography>Sprint List</Typography>
                </AccordionSummary>
                <List dense>
                    {data &&
                        data.map((sprint) => (
                            <ListItem
                                key={sprint.id}
                                secondaryAction={
                                    <IconButton
                                        onClick={() =>
                                            handleDeleteSprint(sprint)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton
                                    component={Link}
                                    to={`/projects/${projectId}/sprints/${sprint.id}`}
                                >
                                    <ListItemText>
                                        {sprint.name.length > 0
                                            ? `${sprint.name} (${sprint.id})`
                                            : `Sprint ${sprint.id}`}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Accordion>
        </>
    );
};

export default SprintList;
