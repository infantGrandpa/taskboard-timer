import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { TaskProvider } from "../../providers/TaskProvider";
import NewTaskTable from "./NewTaskTable";
import { TaskQuery } from "../../constants/tasks";

const NewTasksPage = () => {
    let { id } = useParams();
    return (
        <>
            <Typography variant="h2">
                Create New Tasks for Project {id}
            </Typography>
            <TaskProvider initialTaskQuery={{ project_id: id } as TaskQuery}>
                <NewTaskTable />
            </TaskProvider>
        </>
    );
};

export default NewTasksPage;
