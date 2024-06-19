import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { SprintTask } from "../constants/sprintTasks";

interface TimerContextType {
    timeLeft: number;
    formattedTimeLeft: string;
    timerActive: boolean;
    unpauseTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    currentTask: SprintTask | null | undefined;
    setCurrentTask: (task?: SprintTask) => void;
}

const TimerContext = createContext<TimerContextType>({
    timeLeft: 20 * 60, // Default time (20 minutes)
    formattedTimeLeft: "20:00",
    timerActive: false,
    unpauseTimer: () => {},
    pauseTimer: () => {},
    resetTimer: () => {},
    currentTask: null,
    setCurrentTask: () => {},
});

interface Props {
    children: ReactNode;
}

const TimerProvider = ({ children }: Props) => {
    const secsOnTimer = 20 * 60; //20 minutes
    const [timeLeft, setTimeLeft] = useState(secsOnTimer);
    const [timerActive, setTimerActive] = useState(false);
    const [currentTask, setCurrentTask] = useState<
        SprintTask | null | undefined
    >(null);

    useEffect(() => {
        if (!timerActive) {
            return;
        }

        if (!timeLeft) {
            setTimerActive(false);
            return;
        }

        //Subtract a second from time left
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, timerActive]);

    const unpauseTimer = () => {
        setTimerActive(true);
    };

    const pauseTimer = () => {
        setTimerActive(false);
    };

    const resetTimer = () => {
        setTimeLeft(secsOnTimer);
        setTimerActive(false);
    };

    const formatTimeLeft = () => {
        // Convert time left into minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        // Pad with zeros if necessary (turn 1:9 into 1:09)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <TimerContext.Provider
            value={{
                timeLeft: timeLeft,
                formattedTimeLeft: formatTimeLeft(),
                timerActive: timerActive,
                unpauseTimer: unpauseTimer,
                pauseTimer: pauseTimer,
                resetTimer: resetTimer,
                currentTask: currentTask,
                setCurrentTask: setCurrentTask,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

function useTimerContext() {
    return useContext(TimerContext);
}

export { TimerProvider, useTimerContext };
