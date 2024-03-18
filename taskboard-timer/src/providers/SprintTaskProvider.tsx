import { ReactNode, createContext, useContext, useState } from "react";
import useSprintTasks, {
    SprintTask,
    SprintTaskQuery,
} from "../hooks/useSprintTasks";

interface SprintTaskContentType {
    data: SprintTask[] | null;
    isLoading: boolean;
    error: string | undefined;
    sprintTaskQuery?: SprintTaskQuery;
    setSprintTaskQuery: (query: SprintTaskQuery) => void;
}

const SprintTaskContext = createContext<SprintTaskContentType>({
    data: null,
    isLoading: false,
    error: undefined,
    sprintTaskQuery: undefined,
    setSprintTaskQuery: () => void 0,
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

    const { data, isLoading, error } = useSprintTasks(sprintTaskQuery);

    return (
        <SprintTaskContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                error: error,
                sprintTaskQuery: sprintTaskQuery,
                setSprintTaskQuery: setSprintTaskQuery,
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
