import { ReactNode, createContext, useContext, useState } from "react";
import useTasks, { Task, TaskQuery } from "../hooks/useTasks";

interface TaskContentType {
    taskQuery?: TaskQuery;
    setTaskQuery: (query: TaskQuery) => void;
    data: Task[] | null;
    isLoading: boolean;
    error: string | undefined;
    triggerRefresh: () => void;
    resetRefresh: () => void;
    refreshNeeded: boolean;
}

const TaskContext = createContext<TaskContentType>({
    taskQuery: undefined,
    setTaskQuery: () => void 0,
    triggerRefresh: () => void 0,
    resetRefresh: () => void 0,
    refreshNeeded: false,
    data: null,
    isLoading: false,
    error: undefined,
});

interface Props {
    children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
    const [refreshNeeded, setRefreshNeeded] = useState(false);
    const [taskQuery, setTaskQuery] = useState<TaskQuery>({
        project_id: 17,
    } as TaskQuery);

    const { data, isLoading, error } = useTasks(taskQuery);

    const triggerRefresh = () => setRefreshNeeded(true);
    const resetRefresh = () => setRefreshNeeded(false);

    return (
        <TaskContext.Provider
            value={{
                taskQuery: taskQuery,
                setTaskQuery: setTaskQuery,
                data: data,
                isLoading: isLoading,
                error: error,
                triggerRefresh: triggerRefresh,
                resetRefresh: resetRefresh,
                refreshNeeded: refreshNeeded,
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
