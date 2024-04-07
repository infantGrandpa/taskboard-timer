import { Card, CardContent, Stack, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";
import { getPriorityLabel } from "../../../constants/priorityLabels";
import { getStatusLabel } from "../../../constants/statusLabels";

interface Props {
    sprintTask: SprintTask;
}

const SprintTaskCard = ({ sprintTask }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    {sprintTask.task_details.name}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" display="block">
                        {getPriorityLabel(sprintTask.priority)}
                    </Typography>
                    <Typography variant="caption" display="block">
                        {getStatusLabel(sprintTask.status)}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default SprintTaskCard;
