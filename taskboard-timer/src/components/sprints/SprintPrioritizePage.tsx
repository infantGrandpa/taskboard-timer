import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { SprintTaskProvider } from "../../providers/SprintTaskProvider";
import SprintTaskPrioritizeList from "./SprintTaskPrioritizeList";
import routes from "../../constants/routes";
import { SprintProvider } from "../../providers/SprintProvider";

const SprintPrioritizePage = () => {
    const { id, sprintId } = useParams();

    return (
        <>
            <Button
                component={Link}
                to={routes.project(id)}
                startIcon={<ArrowBackIosNewIcon />}
            >
                Back to Project
            </Button>
            {sprintId && (
                <SprintProvider
                    initialSprintQuery={{
                        id: Number(sprintId),
                        project_id: Number(id),
                    }}
                >
                    <SprintTaskProvider
                        initialSprintTaskQuery={{ sprint_id: Number(sprintId) }}
                    >
                        <SprintTaskPrioritizeList />
                    </SprintTaskProvider>
                </SprintProvider>
            )}
        </>
    );
};

export default SprintPrioritizePage;
