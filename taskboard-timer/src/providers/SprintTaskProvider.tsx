import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import useSprintTasks from "../hooks/useSprintTasks";
import {
    SprintTask,
    SprintTaskCreationData,
    SprintTaskQuery,
} from "../constants/sprintTasks";
import { editSprintTask } from "../services/sprintService";

interface SprintTaskContentType {
    data: SprintTask[] | null;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    sprintTaskQuery?: SprintTaskQuery;
    setSprintTaskQuery: (query: SprintTaskQuery) => void;
    updateTask: (newSprintTaskData: SprintTaskCreationData) => Promise<void>;
}

const SprintTaskContext = createContext<SprintTaskContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    sprintTaskQuery: undefined,
    setSprintTaskQuery: () => {},
    updateTask: async () => {},
});

interface Props {
    children: ReactNode;
    initialSprintTaskQuery?: SprintTaskQuery;
}

const SprintTaskProvider = ({ children, initialSprintTaskQuery }: Props) => {
    const [sprintTaskQuery, setSprintTaskQuery] = useState<SprintTaskQuery>(
        initialSprintTaskQuery
            ? initialSprintTaskQuery
            : ({} as SprintTaskQuery)
    );

    const { data, isLoading, message, status } =
        useSprintTasks(sprintTaskQuery);

    const [sprintTaskData, setSprintTaskData] = useState(data);

    useEffect(() => {
        setSprintTaskData(data);
    }, [data]);

    const updateTask = async (newSprintTaskData: SprintTaskCreationData) => {
        // Optimistically update the state
        const optimisticData = sprintTaskData.map((sprintTask) => {
            console.log(sprintTask);
            if (sprintTask.task_id === newSprintTaskData.task_id) {
                // Log to see when a match is found
                console.log(`Match found for task_id: ${sprintTask.task_id}`);
                return { ...sprintTask, ...newSprintTaskData }; // Update the matched task
            } else {
                return sprintTask; // Return the task unchanged
            }
        });

        setSprintTaskData(optimisticData);

        try {
            await editSprintTask(newSprintTaskData);
        } catch (error) {
            setSprintTaskData(data);
            console.error(error);
        }
    };

    return (
        <SprintTaskContext.Provider
            value={{
                data: sprintTaskData,
                isLoading: isLoading,
                message: message,
                status: status,
                sprintTaskQuery: sprintTaskQuery,
                setSprintTaskQuery: setSprintTaskQuery,
                updateTask: updateTask,
            }}
        >
            {children}
        </SprintTaskContext.Provider>
    );
};

function useSprintTaskContext() {
    return useContext(SprintTaskContext);
}

export { SprintTaskProvider, useSprintTaskContext };
