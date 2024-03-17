import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useSprintTasks, { SprintTaskQuery } from "../../hooks/useSprintTasks";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

const SprintPrioritizePage = () => {
    const { id, sprintId } = useParams();
    const [sprintTaskQuery, setSprintTaskQuery] = useState<SprintTaskQuery>({
        sprint_id: sprintId,
    } as SprintTaskQuery);

    console.log("SPRINT TASK QUERY");
    console.log(sprintTaskQuery);
    const { data, isLoading, error } = useSprintTasks(sprintTaskQuery);

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    console.log("DATA");
    console.log(data);

    return (
        <>
            <Button
                component={Link}
                to={`/projects/${id}`}
                startIcon={<ArrowBackIosNewIcon />}
            >
                Back to Project
            </Button>
            <Typography>Sprint ID: {sprintId}</Typography>
        </>
    );
};

export default SprintPrioritizePage;
