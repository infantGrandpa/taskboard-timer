import { Accordion, AccordionSummary, List, Typography } from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import { useSprintContext } from "../../providers/SprintProvider";
import NewSprintButton from "./NewSprintButton";
import { StatusAlert } from "../StatusAlert";
import { SprintQuery } from "../../constants/sprints";
import SprintListItem from "./SprintListItem";

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
                            <SprintListItem sprint={sprint} key={sprint.id} />
                        ))}
                </List>
            </Accordion>
        </>
    );
};

export default SprintList;
