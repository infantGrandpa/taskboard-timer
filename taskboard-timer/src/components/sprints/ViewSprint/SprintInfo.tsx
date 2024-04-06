import { useSprintContext } from "../../../providers/SprintProvider";
import LoadingBackdrop from "../../LoadingBackdrop";
import { StatusAlert } from "../../StatusAlert";
import { Typography } from "@mui/material";
import DateRange from "../../DateRange";

const SprintInfo = () => {
    const { data, isLoading, message, status } = useSprintContext();

    const sprint = data ? data[0] : null;

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (!sprint) {
        return <StatusAlert status="error" message="ERROR: INVALID SPRINT" />;
    }

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
            <Typography variant="h4">{sprint.name}</Typography>
            <Typography variant="body1">
                Hours Remaining: {sprint.total_hours - sprint.completed_hours}
            </Typography>
            <Typography>
                Sprint End Date:{" "}
                <DateRange startDate={null} endDate={sprint.end_date} />
            </Typography>
            <Typography variant="caption">
                Project {sprint.project_id}, Sprint {sprint.id}
            </Typography>
        </>
    );
};

export default SprintInfo;
