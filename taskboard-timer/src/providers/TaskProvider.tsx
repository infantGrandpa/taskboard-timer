import { ReactNode, createContext, useContext, useState } from "react";
import useTasks, { Task, TaskQuery } from "../hooks/useTasks";

interface TaskContentType {
    data: Task[] | null;
    isLoading: boolean;
    error: string | undefined;
    taskQuery?: TaskQuery;
    setTaskQuery: (query: TaskQuery) => void;
}

const TaskContext = createContext<TaskContentType>({
    data: null,
    isLoading: false,
    error: undefined,
    taskQuery: undefined,
    setTaskQuery: () => void 0,
});

interface Props {
    children: ReactNode;
    initialTaskQuery?: TaskQuery;
}

const TaskProvider = ({ children, initialTaskQuery }: Props) => {
    const [taskQuery, setTaskQuery] = useState<TaskQuery>(
        initialTaskQuery ? initialTaskQuery : ({} as TaskQuery)
    );

    const { data, isLoading, error } = useTasks(taskQuery);

    return (
        <TaskContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                error: error,
                taskQuery: taskQuery,
                setTaskQuery: setTaskQuery,
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
