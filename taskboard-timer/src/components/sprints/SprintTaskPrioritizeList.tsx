import { Stack, Typography } from "@mui/material";
import { useSprintTaskContext } from "../../providers/SprintTaskProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StatusAlert } from "../StatusAlert";
import { StatusLabels } from "../../constants/statusLabels";
import { PriorityLabels } from "../../constants/priorityLabels";
import { editSprintTask } from "../../services/sprintService";
import { SprintTaskCreationData } from "../../constants/sprintTasks";

const SprintTaskPrioritizeList = () => {
    const { data, isLoading, message, status } = useSprintTaskContext();

    const { sprintId } = useParams();

    console.log(data);
    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (!data || data?.length === 0 || !data[0].hasOwnProperty("task_id")) {
        return <ErrorMessage message="No data!" />;
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "priority",
            headerName: "Priority",
            minWidth: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: Object.values(PriorityLabels),
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: Object.values(StatusLabels),
        },
    ];

    const tableData = data.map((sprintTask) => ({
        id: sprintTask.task_id,
        name: sprintTask.task_details.name,
        priority: PriorityLabels[sprintTask.priority],
        status: StatusLabels[sprintTask.status],
    }));

    const handleEditSprintTaskRow = (updatedRow: any) => {
        const newSprintTaskData = {
            sprint_id: Number(sprintId),
            task_id: updatedRow.id,
            priority: updatedRow.priority,
            status: updatedRow.status,
        } as SprintTaskCreationData;

        editSprintTask(newSprintTaskData);
    };

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ my: 2 }}
            >
                <Typography variant="h4">
                    Prioritization for Sprint {sprintId}
                </Typography>
                <Typography variant="h4">Tasks: {data?.length}</Typography>
            </Stack>
            <DataGrid
                columns={columns}
                rows={tableData}
                editMode="row"
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25,
                        },
                    },
                }}
                pageSizeOptions={[25]}
                processRowUpdate={(updatedRow) => {
                    handleEditSprintTaskRow(updatedRow);
                    <StatusAlert status={status} message={"Updated"} />;
                }}
                onProcessRowUpdateError={(errorMessage) =>
                    console.log(`ERROR: ${errorMessage}`)
                }
            />
        </>
    );
};

export default SprintTaskPrioritizeList;
