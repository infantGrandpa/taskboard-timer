import { Card, CardContent, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";

interface Props {
    sprintTask: SprintTask;
}

const SprintTaskCard = ({ sprintTask }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="body1">
                    {sprintTask.task_details.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SprintTaskCard;
