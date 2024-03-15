import { TaskProvider } from "../../providers/TaskProvider";
import AddTasksToSprintTable from "./AddTasksToSprintTable";
import { TaskQuery } from "../../hooks/useTasks";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const EditSprintPage = () => {
    const { id, sprintId } = useParams();

    return (
        <TaskProvider initialTaskQuery={{ project_id: id } as TaskQuery}>
            <Button
                component={Link}
                to={`/projects/${id}`}
                startIcon={<ArrowBackIosNewIcon />}
            >
                Back to Project
            </Button>
            <AddTasksToSprintTable sprintId={Number(sprintId)} />
        </TaskProvider>
    );
};

export default EditSprintPage;
