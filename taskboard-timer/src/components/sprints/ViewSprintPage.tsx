import { useParams } from "react-router-dom";
import { SprintProvider } from "../../providers/SprintProvider";
import SprintInfo from "./ViewSprint/SprintInfo";

const ViewSprintPage = () => {
    const { id, sprintId } = useParams();
    return (
        <SprintProvider
            initialSprintQuery={{
                id: Number(sprintId),
                project_id: Number(id),
            }}
        >
            <SprintInfo />
        </SprintProvider>
    );
};

export default ViewSprintPage;
