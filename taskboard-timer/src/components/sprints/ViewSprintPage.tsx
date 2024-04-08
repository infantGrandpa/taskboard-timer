import { useParams } from "react-router-dom";

import { SprintTaskProvider } from "../../providers/SprintTaskProvider";
import SprintTaskGrid from "./ViewSprint/SprintTaskGrid";

const ViewSprintPage = () => {
    const { sprintId } = useParams();

    return (
        <SprintTaskProvider
            initialSprintTaskQuery={{ sprint_id: Number(sprintId) }}
        >
            <SprintTaskGrid />
        </SprintTaskProvider>
    );
};

export default ViewSprintPage;
