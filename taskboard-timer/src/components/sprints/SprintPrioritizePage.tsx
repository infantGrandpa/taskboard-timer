import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const SprintPrioritizePage = () => {
    const { id, sprintId } = useParams();
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
