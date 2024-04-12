import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import useTasks from "../hooks/useTasks";
import { Task, TaskQuery } from "../constants/tasks";
import { deleteTask } from "../services/taskService";

interface TaskContentType {
    data: Task[] | null;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    taskQuery?: TaskQuery;
    setTaskQuery: (query: TaskQuery) => void;
    deleteTask: (taskToDelete: Task) => Promise<void>;
}

const TaskContext = createContext<TaskContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    taskQuery: undefined,
    setTaskQuery: () => {},
    deleteTask: async () => {},
});

interface Props {
    children: ReactNode;
    initialTaskQuery?: TaskQuery;
}

const TaskProvider = ({ children, initialTaskQuery }: Props) => {
    const [taskQuery, setTaskQuery] = useState<TaskQuery>(
        initialTaskQuery ? initialTaskQuery : ({} as TaskQuery)
    );

    const { data, isLoading, message, status } = useTasks(taskQuery);

    const [taskData, setTaskData] = useState(data);

    useEffect(() => {
        setTaskQuery(initialTaskQuery ? initialTaskQuery : ({} as TaskQuery));
    }, [initialTaskQuery]);

    useEffect(() => {
        setTaskData(data);
    }, [data]);

    const deleteTaskOptimistic = async (taskToDelete: Task) => {
        const optimisticData = taskData.filter(
            (task) => task.id !== taskToDelete.id
        );

        setTaskData(optimisticData);

        try {
            await deleteTask(taskToDelete);
        } catch (error) {
            setTaskData(data);
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                data: taskData,
                isLoading: isLoading,
                message: message,
                status: status,
                taskQuery: taskQuery,
                setTaskQuery: setTaskQuery,
                deleteTask: deleteTaskOptimistic,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

function useTaskContext() {
    return useContext(TaskContext);
}

export { TaskProvider, useTaskContext };
