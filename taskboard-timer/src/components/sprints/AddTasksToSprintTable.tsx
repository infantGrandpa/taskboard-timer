import { Button, Typography } from "@mui/material";
import { addTasksToSprint } from "../../services/sprintService";
import { Task } from "../../hooks/useTasks";
import { useTaskContext } from "../../providers/TaskProvider";
import DynamicTable, { Column } from "../DynamicTable";
import LoadingBackdrop from "../LoadingBackdrop";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

interface Props {
    sprintId: number;
}

const AddTasksToSprintTable = ({ sprintId }: Props) => {
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
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
        setSelectedTasks([...selectedTasks, data[0]]);
        console.log("SELECTED TASKS");
        console.log(selectedTasks);
        addTasksToSprint(sprintId, selectedTasks);
    };

    const columns: Column[] = [
        { field: "name", label: "Name" },
        { field: "estimated_hours", label: "Estimated Hours" },
        { field: "hours_worked", label: "Hours Worked" },
    ];

    const tableData = data.map((task) => ({
        name: task.name,
        estimated_hours: task.estimated_hours,
        hours_worked: task.hours_worked,
    }));

    return (
        <>
            <Typography variant="h3">Add Tasks to Sprint {sprintId}</Typography>
            <DynamicTable data={tableData} columns={columns} />
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
