import { ReactNode, createContext, useContext, useState } from "react";
import useSprintTasks from "../hooks/useSprintTasks";
import { SprintTask, SprintTaskQuery } from "../constants/sprintTasks";

interface SprintTaskContentType {
    data: SprintTask[] | null;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    sprintTaskQuery?: SprintTaskQuery;
    setSprintTaskQuery: (query: SprintTaskQuery) => void;
}

const SprintTaskContext = createContext<SprintTaskContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
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

    const { data, isLoading, message, status } =
        useSprintTasks(sprintTaskQuery);

    return (
        <SprintTaskContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                message: message,
                status: status,
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
