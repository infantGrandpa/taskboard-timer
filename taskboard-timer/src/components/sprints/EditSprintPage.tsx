import { TaskProvider } from "../../providers/TaskProvider";
import AddTasksToSprintTable from "./AddTasksToSprintTable";
import { Link, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditSprintForm from "./EditSprintForm";
import { SprintProvider } from "../../providers/SprintProvider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TaskQuery } from "../../constants/tasks";
import { SprintQuery } from "../../constants/sprints";
import routes from "../../constants/routes";

const EditSprintPage = () => {
    const { id, sprintId } = useParams();

    return (
        <TaskProvider initialTaskQuery={{ project_id: id } as TaskQuery}>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
            >
                <Button
                    component={Link}
                    to={routes.project(id)}
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Back to Project
                </Button>
                <Button
                    component={Link}
                    to={routes.prioritizeTasks(id, sprintId)}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Prioritize Tasks
                </Button>
            </Stack>
            <SprintProvider
                initialSprintQuery={{ id: Number(sprintId) } as SprintQuery}
            >
                <EditSprintForm />
                <AddTasksToSprintTable sprintId={Number(sprintId)} />
            </SprintProvider>
        </TaskProvider>
    );
};

export default EditSprintPage;
