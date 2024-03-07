import { ReactNode, createContext, useContext, useState } from "react";

interface TaskContentType {
    triggerRefresh: () => void;
    resetRefresh: () => void;
    refreshNeeded: boolean;
}

const TaskContext = createContext<TaskContentType>({
    triggerRefresh: () => void 0,
    resetRefresh: () => void 0,
    refreshNeeded: false,
});

interface Props {
    children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
    const [refreshNeeded, setRefreshNeeded] = useState(false);

    const triggerRefresh = () => setRefreshNeeded(true);
    const resetRefresh = () => setRefreshNeeded(false);

    return (
        <TaskContext.Provider
            value={{ triggerRefresh, resetRefresh, refreshNeeded }}
        >
            {children}
        </TaskContext.Provider>
    );
};

function useTaskContext() {
    return useContext(TaskContext);
}

export { TaskProvider, useTaskContext };
