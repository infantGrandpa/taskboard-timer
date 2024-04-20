import { useParams } from "react-router-dom";

import { SprintTaskProvider } from "../../providers/SprintTaskProvider";
import SprintTaskGrid from "./ViewSprint/SprintTaskGrid";
import TimerFab from "../timer/TimerFab";

const ViewSprintPage = () => {
    const { sprintId } = useParams();

    return (
        <SprintTaskProvider
            initialSprintTaskQuery={{ sprint_id: Number(sprintId) }}
        >
            <SprintTaskGrid />
            <TimerFab />
        </SprintTaskProvider>
    );
};

export default ViewSprintPage;
