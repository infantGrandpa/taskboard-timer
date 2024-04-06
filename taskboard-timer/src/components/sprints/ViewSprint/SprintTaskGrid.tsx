import Grid from "@mui/material/Unstable_Grid2";
import { StatusLabels } from "../../../constants/statusLabels";
import { SprintProvider } from "../../../providers/SprintProvider";
import SprintInfo from "./SprintInfo";
import { useParams } from "react-router-dom";
import { PriorityLabels } from "../../../constants/priorityLabels";
import React from "react";

const SprintTaskGrid = () => {
    const { id, sprintId } = useParams();

    return (
        <Grid
            container
            spacing={2}
            sx={{ border: "2px solid grey" }}
            justifyContent="space-between"
        >
            <Grid xs={4} sx={{ border: "1px dashed grey" }}>
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
                    xs={2}
                    key={status}
                    sx={{ border: "1px dashed grey", textAlign: "center" }}
                >
                    {status}
                </Grid>
            ))}
            {Object.values(PriorityLabels).map((priority) => (
                <React.Fragment key={priority}>
                    <Grid xs={4} sx={{ border: "1px dashed blue" }}>
                        {priority}
                    </Grid>
                    {Array(4)
                        .fill("Task")
                        .map((_, index) => (
                            <Grid
                                xs={2}
                                key={index}
                                sx={{
                                    border: "1px dashed yellow",
                                }}
                            >
                                {index}: {priority}
                            </Grid>
                        ))}
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default SprintTaskGrid;
