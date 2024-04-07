import Grid from "@mui/material/Unstable_Grid2";
import {
    StatusLabels,
    getStatusByIndex,
    getStatusEnumKey,
} from "../../../constants/statusLabels";
import { SprintProvider } from "../../../providers/SprintProvider";
import SprintInfo from "./SprintInfo";
import { useParams } from "react-router-dom";
import {
    PriorityLabels,
    getPriorityEnumKey,
} from "../../../constants/priorityLabels";
import React from "react";
import SprintTaskCard from "./SprintTaskCard";
import { useSprintTaskContext } from "../../../providers/SprintTaskProvider";
import LoadingBackdrop from "../../LoadingBackdrop";
import { StatusAlert } from "../../StatusAlert";

const SprintTaskGrid = () => {
    const { id, sprintId } = useParams();
    const { data, isLoading, message, status } = useSprintTaskContext();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    const headerColWidth = { xs: 12, sm: 4 } as const;
    const columnWidth = { xs: 12, sm: 2 } as const;

    console.log("data");
    console.log(data);

    const filterTasks = (priority: string, status: string) => {
        if (!data) {
            console.error("NO DATA FOR FILTERING");
            return;
        }

        return data.filter(
            (task) =>
                task.priority === getPriorityEnumKey(priority) &&
                task.status === getStatusEnumKey(status)
        );
    };

    console.log("filter");
    console.log(filterTasks("WONT_HAVE", "TODO"));

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
            <Grid container spacing={2}>
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
                        <Grid {...headerColWidth}>{priority}</Grid>
                        {Array(4)
                            .fill("Task")
                            .map((_, index) => (
                                <Grid {...columnWidth} key={index}>
                                    <SprintTaskCard
                                        tasks={filterTasks(
                                            priority,
                                            getStatusByIndex(index)
                                        )}
                                        priority={priority}
                                        status={getStatusByIndex(index)}
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
