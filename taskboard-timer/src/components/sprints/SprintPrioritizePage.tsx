import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SprintTaskQuery } from "../../hooks/useSprintTasks";
import { SprintTaskProvider } from "../../providers/SprintTaskProvider";
import SprintTaskPrioritizeList from "./SprintTaskPrioritizeList";

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
            <SprintTaskProvider
                initialSprintTaskQuery={
                    { sprint_id: sprintId } as SprintTaskQuery
                }
            >
                <SprintTaskPrioritizeList />
            </SprintTaskProvider>
        </>
    );
};

export default SprintPrioritizePage;
