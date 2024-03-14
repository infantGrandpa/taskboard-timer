import {
    Accordion,
    AccordionSummary,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import { useSprintContext } from "../../providers/SprintProvider";
import NewSprintButton from "./NewSprintButton";
import { SprintQuery } from "../../hooks/useSprints";
import { Link } from "react-router-dom";

const SprintList = () => {
    const { data, isLoading, error, sprintQuery, setSprintQuery } =
        useSprintContext();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    const projectId = sprintQuery?.project_id;

    if (!projectId) {
        return <ErrorMessage message="No project id!" />;
    }

    return (
        <Accordion>
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
                        <ListItemButton
                            component={Link}
                            to={`/projects/${projectId}/sprints/${sprint.id}`}
                            key={sprint.id}
                        >
                            <ListItemText>
                                {sprint.name.length > 0
                                    ? `${sprint.name} (${sprint.id})`
                                    : `Sprint ${sprint.id}`}
                            </ListItemText>
                        </ListItemButton>
                    ))}
            </List>
        </Accordion>
    );
};

export default SprintList;
