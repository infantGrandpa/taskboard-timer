import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const NewTasksPage = () => {
    let { id } = useParams();
    return (
        <Typography variant="h2">Create New Tasks for Project {id}</Typography>
    );
};

export default NewTasksPage;
