import { Sprint } from "../../constants/sprints";
import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import { deleteSprint } from "../../services/sprintService";
import { Link } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../constants/routes";

interface Props {
    sprint: Sprint;
}

const SprintListItem = ({ sprint }: Props) => {
    const handleDeleteSprint = async (sprint: Sprint) => {
        await deleteSprint(sprint);
    };

    return (
        <ListItem
            secondaryAction={
                <Stack direction="row">
                    <IconButton
                        component={Link}
                        to={routes.editSprint(sprint.project_id, sprint.id)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        component={Link}
                        to={routes.prioritizeTasks(
                            sprint.project_id,
                            sprint.id
                        )}
                    >
                        <SortIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteSprint(sprint)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            }
        >
            <ListItemButton
                component={Link}
                to={routes.sprint(sprint.project_id, sprint.id)}
            >
                <ListItemText>
                    {sprint.name.length > 0
                        ? `${sprint.name} (${sprint.id})`
                        : `Sprint ${sprint.id}`}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

export default SprintListItem;
