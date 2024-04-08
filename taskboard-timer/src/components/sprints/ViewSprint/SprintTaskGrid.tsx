import Grid from "@mui/material/Unstable_Grid2";
import { StatusLabels } from "../../../constants/statusLabels";
import { SprintProvider } from "../../../providers/SprintProvider";
import SprintInfo from "./SprintInfo";
import { useParams } from "react-router-dom";
import { PriorityLabels } from "../../../constants/priorityLabels";
import React from "react";
import SprintTaskCell from "./SprintTaskCell";
import { useSprintTaskContext } from "../../../providers/SprintTaskProvider";
import LoadingBackdrop from "../../LoadingBackdrop";
import { StatusAlert } from "../../StatusAlert";
import { getEnumKeyFromLabel } from "../../../utilities/labelHelper";

const SprintTaskGrid = () => {
    const { id, sprintId } = useParams();
    const { data, isLoading, message, status } = useSprintTaskContext();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    const headerColWidth = { xs: 12, sm: 4 } as const;
    const columnWidth = { xs: 12, sm: 2 } as const;

    const filterTasks = (priority: string, status: string) => {
        if (!data) {
            console.error("NO TASK DATA TO FILTERING");
            return;
        }

        const priorityEnumKey = getEnumKeyFromLabel(priority, PriorityLabels);
        const statusEnumKey = getEnumKeyFromLabel(status, StatusLabels);

        return data.filter(
            (task) =>
                task.priority === priorityEnumKey &&
                task.status === statusEnumKey
        );
    };

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
            <Grid
                container
                spacing={2}
                sx={{
                    "& > div": {
                        borderRight: "1px dashed grey",
                        borderBottom: "1px dashed grey",
                    },
                }}
            >
                <Grid {...headerColWidth}>
                    <SprintProvider
                        initialSprintQuery={{
                            id: Number(sprintId),
                            project_id: Number(id),
                        }}
                    >
                        <SprintInfo />
                    </SprintProvider>
                </Grid>
                {Object.values(StatusLabels).map((status) => (
                    <Grid
                        {...columnWidth}
                        key={status}
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        {status}
                    </Grid>
                ))}
                {Object.values(PriorityLabels).map((priority) => (
                    <React.Fragment key={priority}>
                        <Grid {...headerColWidth} sx={{ minHeight: "200px" }}>
                            {priority}
                        </Grid>
                        {Object.values(StatusLabels).map((status) => (
                            <Grid {...columnWidth} key={status}>
                                <SprintTaskCell
                                    tasks={filterTasks(priority, status)}
                                    priority={priority}
                                    status={status}
                                />
                            </Grid>
                        ))}
                    </React.Fragment>
                ))}
            </Grid>
        </>
    );
};

export default SprintTaskGrid;
