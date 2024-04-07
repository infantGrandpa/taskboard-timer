import { Card, CardContent, Typography } from "@mui/material";
import { SprintTask } from "../../../constants/sprintTasks";

interface Props {
    tasks: SprintTask[] | undefined;
    priority: string;
    status: string;
}

const SprintTaskCard = ({ tasks, priority, status }: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {tasks ? tasks.length : "???"} Tasks
                </Typography>
                <Typography variant="subtitle1" display="block">
                    {priority}
                </Typography>
                <Typography variant="subtitle2" display="block">
                    {status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SprintTaskCard;
