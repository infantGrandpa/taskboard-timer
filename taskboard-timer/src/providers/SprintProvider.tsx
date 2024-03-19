import { ReactNode, createContext, useContext, useState } from "react";
import useSprints, { Sprint, SprintQuery } from "../hooks/useSprints";

interface SprintContentType {
    data: Sprint[] | null;
    isLoading: boolean;
    message: string | undefined;
    status: string | undefined;
    sprintQuery?: SprintQuery;
    setSprintQuery: (query: SprintQuery) => void;
}

const SprintContext = createContext<SprintContentType>({
    data: null,
    isLoading: false,
    message: undefined,
    status: undefined,
    sprintQuery: undefined,
    setSprintQuery: () => void 0,
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

    return (
        <SprintContext.Provider
            value={{
                data: data,
                isLoading: isLoading,
                message: message,
                status: status,
                sprintQuery: sprintQuery,
                setSprintQuery: setSprintQuery,
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
