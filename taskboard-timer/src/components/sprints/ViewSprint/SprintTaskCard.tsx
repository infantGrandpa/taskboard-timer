import { Card, CardContent, Stack, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";
import { PriorityLabels } from "../../../constants/priorityLabels";
import { StatusLabels } from "../../../constants/statusLabels";
import SprintTaskButtons from "./SprintTaskButtons";
import { getLabelByEnumKey } from "../../../utilities/labelHelper";

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
                        {getLabelByEnumKey(sprintTask.priority, PriorityLabels)}
                    </Typography>
                    <Typography variant="caption" display="block">
                        {getLabelByEnumKey(sprintTask.status, StatusLabels)}
                    </Typography>
                </Stack>
                <SprintTaskButtons sprintTask={sprintTask} />
            </CardContent>
        </Card>
    );
};

export default SprintTaskCard;
