import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";
import { useSprintContext } from "../../providers/SprintProvider";
import NewSprintButton from "./NewSprintButton";
import { SprintQuery } from "../../hooks/useSprints";

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

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
            >
                <Typography variant="h4">Sprint List</Typography>
                {projectId && (
                    <NewSprintButton
                        projectId={projectId}
                        onCreateNew={() =>
                            setSprintQuery({
                                project_id: projectId,
                            } as SprintQuery)
                        }
                    />
                )}
            </Stack>
            <List dense>
                {data &&
                    data.map((sprint) => (
                        <ListItem key={sprint.id}>
                            <ListItemText>
                                {sprint.name.length > 0
                                    ? `${sprint.name} (${sprint.id})`
                                    : `Sprint ${sprint.id}`}
                            </ListItemText>
                        </ListItem>
                    ))}
            </List>
        </>
    );
};

export default SprintList;
