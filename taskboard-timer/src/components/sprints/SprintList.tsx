import { List, ListItem, ListItemText, Typography } from "@mui/material";
import useSprints from "../../hooks/useSprints";
import ErrorMessage from "../ErrorMessage";
import LoadingBackdrop from "../LoadingBackdrop";

const SprintList = () => {
    const { data, isLoading, error } = useSprints();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <>
            <Typography variant="h3">Sprint List</Typography>
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
