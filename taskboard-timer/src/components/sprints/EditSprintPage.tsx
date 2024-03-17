import { TaskProvider } from "../../providers/TaskProvider";
import AddTasksToSprintTable from "./AddTasksToSprintTable";
import { TaskQuery } from "../../hooks/useTasks";
import { Link, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditSprintForm from "./EditSprintForm";
import { SprintProvider } from "../../providers/SprintProvider";
import { SprintQuery } from "../../hooks/useSprints";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
                    to={`/projects/${id}`}
                    startIcon={<ArrowBackIosNewIcon />}
                >
                    Back to Project
                </Button>
                <Button
                    component={Link}
                    to={`/projects/${id}/sprints/${sprintId}/prioritize`}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Prioritize Tasks
                </Button>
            </Stack>
            <SprintProvider
                initialSprintQuery={{ id: Number(sprintId) } as SprintQuery}
            >
                <EditSprintForm />
            </SprintProvider>
            <AddTasksToSprintTable sprintId={Number(sprintId)} />
        </TaskProvider>
    );
};

export default EditSprintPage;
