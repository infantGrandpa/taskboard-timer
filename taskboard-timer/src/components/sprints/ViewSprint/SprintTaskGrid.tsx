import Grid from "@mui/material/Unstable_Grid2";
import { StatusLabels } from "../../../constants/statusLabels";
import { SprintProvider } from "../../../providers/SprintProvider";
import SprintInfo from "./SprintInfo";
import { useParams } from "react-router-dom";
import { PriorityLabels } from "../../../constants/priorityLabels";
import React from "react";

const SprintTaskGrid = () => {
    const { id, sprintId } = useParams();

    const headerColWidth = { xs: 12, sm: 4 } as const;
    const columnWidth = { xs: 12, sm: 2 } as const;

    return (
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
                                {index}: {priority}
                            </Grid>
                        ))}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default SprintTaskGrid;
