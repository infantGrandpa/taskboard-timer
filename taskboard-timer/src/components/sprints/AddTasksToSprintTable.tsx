import { Button, Typography } from "@mui/material";
import { SprintTaskData, addTasksToSprint } from "../../services/sprintService";
import { useTaskContext } from "../../providers/TaskProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

interface Props {
    sprintId: number;
}

const AddTasksToSprintTable = ({ sprintId }: Props) => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const { data, isLoading, error } = useTaskContext();

    if (isLoading) {
        return <LoadingBackdrop />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!data) {
        return <ErrorMessage message="No data!" />;
    }

    const handleSaveTasksToSprint = () => {
        const sprintTasksToAdd = selectedRows.map((taskId) => {
            return { task_id: Number(taskId) } as SprintTaskData;
        });
        addTasksToSprint(sprintId, sprintTasksToAdd);
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "estimated_hours", headerName: "Est. Hours", width: 150 },
        { field: "hours_worked", headerName: "Hours Worked", width: 150 },
    ];

    const tableData = data.map((task) => ({
        id: task.id,
        name: task.name,
        estimated_hours: task.estimated_hours,
        hours_worked: task.hours_worked,
    }));

    return (
        <>
            <Typography variant="h4" sx={{ mt: 2 }}>
                Add Tasks to Sprint {sprintId}
            </Typography>
            <DataGrid
                rows={tableData}
                columns={columns}
                checkboxSelection
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25,
                        },
                    },
                }}
                pageSizeOptions={[25]}
                onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection);
                }}
            />
            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSaveTasksToSprint}
            >
                Add Selected Tasks to Sprint
            </Button>
        </>
    );
};

export default AddTasksToSprintTable;
