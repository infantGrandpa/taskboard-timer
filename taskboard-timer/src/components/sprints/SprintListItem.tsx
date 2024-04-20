import { Sprint } from "../../constants/sprints";
import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import SortIcon from "@mui/icons-material/Sort";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../constants/routes";
import { useSprintContext } from "../../providers/SprintProvider";

interface Props {
    sprint: Sprint;
}

const SprintListItem = ({ sprint }: Props) => {
    const { deleteSprint } = useSprintContext();

    const handleDeleteSprint = (sprint: Sprint) => {
        deleteSprint(sprint).catch(console.error);
    };

    return (
        <ListItem
            secondaryAction={
                <Stack direction="row">
                    <Tooltip title="Edit Sprint">
                        <IconButton
                            component={Link}
                            to={routes.editSprint(sprint.project_id, sprint.id)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Prioritize Tasks">
                        <IconButton
                            component={Link}
                            to={routes.prioritizeTasks(
                                sprint.project_id,
                                sprint.id
                            )}
                        >
                            <SortIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Sprint">
                        <IconButton onClick={() => handleDeleteSprint(sprint)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
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
