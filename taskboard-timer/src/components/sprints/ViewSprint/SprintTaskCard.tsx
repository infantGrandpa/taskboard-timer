import { Card, CardContent, Stack, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";
import SprintTaskButtons from "./SprintTaskButtons";

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
                        Est Hrs: {sprintTask.task_details.estimated_hours}
                    </Typography>
                    <Typography variant="caption" display="block">
                        Hrs Worked:{" "}
                        {sprintTask.task_details.hours_worked.toFixed(2)}
                        {/* TODO: When the timer goes off, this doesn't update until refresh. */}
                    </Typography>
                </Stack>
                <SprintTaskButtons sprintTask={sprintTask} />
                <Typography variant="caption">{sprintTask.task_id}</Typography>
            </CardContent>
        </Card>
    );
};

export default SprintTaskCard;
