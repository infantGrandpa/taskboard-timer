import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import useSprints from "../hooks/useSprints";
import { Sprint, SprintQuery } from "../constants/sprints";
import { deleteSprint } from "../services/sprintService";

interface SprintContentType {
    data: Sprint[] | null;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    sprintQuery?: SprintQuery;
    setSprintQuery: (query: SprintQuery) => void;
    deleteSprint: (sprintToDelete: Sprint) => Promise<void>;
}

const SprintContext = createContext<SprintContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    sprintQuery: undefined,
    setSprintQuery: () => {},
    deleteSprint: async () => {},
});

interface Props {
    children: ReactNode;
    initialSprintQuery?: SprintQuery;
}

const SprintProvider = ({ children, initialSprintQuery }: Props) => {
    const [sprintQuery, setSprintQuery] = useState<SprintQuery>(
        initialSprintQuery ? initialSprintQuery : ({} as SprintQuery)
    );

    const { data, isLoading, message, status } = useSprints(sprintQuery);

    const [sprintData, setSprintData] = useState(data);

    useEffect(() => {
        setSprintQuery(
            initialSprintQuery ? initialSprintQuery : ({} as SprintQuery)
        );
    }, [initialSprintQuery]);

    useEffect(() => {
        setSprintData(data);
    }, [data]);

    const deleteSprintOptimistic = async (sprintToDelete: Sprint) => {
        const optimisticData = sprintData.filter(
            (sprint) => sprint.id !== sprintToDelete.id
        );

        setSprintData(optimisticData);

        try {
            await deleteSprint(sprintToDelete);
        } catch (error) {
            setSprintData(data);
            console.error(error);
        }
    };

    return (
        <SprintContext.Provider
            value={{
                data: sprintData,
                isLoading: isLoading,
                message: message,
                status: status,
                sprintQuery: sprintQuery,
                setSprintQuery: setSprintQuery,
                deleteSprint: deleteSprintOptimistic,
            }}
        >
            {children}
        </SprintContext.Provider>
    );
};

function useSprintContext() {
    return useContext(SprintContext);
}

export { SprintProvider, useSprintContext };
