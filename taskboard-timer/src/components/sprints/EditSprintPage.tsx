import { TaskProvider } from "../../providers/TaskProvider";
import AddTasksToSprintTable from "./AddTasksToSprintTable";
import { TaskQuery } from "../../hooks/useTasks";
import { useParams } from "react-router-dom";

const EditSprintPage = () => {
    const { id, sprintId } = useParams();

    console.log(`ID: ${id}`);
    console.log(`Sprint ID: ${sprintId}`);

    return (
        <TaskProvider initialTaskQuery={{ project_id: id } as TaskQuery}>
            <AddTasksToSprintTable sprintId={Number(sprintId)} />
        </TaskProvider>
    );
};

export default EditSprintPage;
