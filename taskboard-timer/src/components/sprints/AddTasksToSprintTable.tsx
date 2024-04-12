import { Button, Stack, Typography } from "@mui/material";
import { addTasksToSprint } from "../../services/sprintService";
import { useTaskContext } from "../../providers/TaskProvider";
import LoadingBackdrop from "../LoadingBackdrop";
import { useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { StatusAlert } from "../StatusAlert";
import { SprintTaskData } from "../../constants/sprintTasks";
import NewTask from "../tasks/NewTask";
import { useSprintContext } from "../../providers/SprintProvider";

interface Props {
    sprintId: number;
}

const AddTasksToSprintTable = ({ sprintId }: Props) => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const { data: taskData, isLoading, message, status } = useTaskContext();
    const { data: sprintData } = useSprintContext();

    const thisSprint = sprintData ? sprintData[0] : undefined;

    if (isLoading) {
        return <LoadingBackdrop />;
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

    const tableData =
        taskData && taskData.length > 0
            ? taskData.map((task) => ({
                  id: task.id,
                  name: task.name,
                  estimated_hours: task.estimated_hours,
                  hours_worked: task.hours_worked,
              }))
            : [
                  {
                      id: 0,
                      name: null,
                      estimated_hours: null,
                      hours_worked: null,
                  },
              ];

    return (
        <>
            {status && <StatusAlert status={status} message={message} />}

            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4" sx={{ mt: 2 }}>
                    Add Tasks to Sprint {sprintId}
                </Typography>
                {thisSprint && <NewTask projectId={thisSprint.project_id} />}
            </Stack>
            {tableData && (
                <>
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
            )}
        </>
    );
};

export default AddTasksToSprintTable;
