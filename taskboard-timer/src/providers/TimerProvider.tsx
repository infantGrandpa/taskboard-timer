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
    setTimerLength: (minutes: number, seconds: number) => void;
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
    setTimerLength: () => {},
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

        //Is the timer done?
        if (!timeLeft) {
            setTimerActive(false);
            handleTimerComplete();
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

    const setTimerLength = (minutes: number, seconds: number) => {
        const totalSeconds = minutes * 60 + seconds;
        setTimerActive(false);
        setTimeLeft(totalSeconds);
    };

    const handleTimerComplete = () => {
        const timeToAdd = secsOnTimer - timeLeft;

        if (currentTask) {
            console.log("Timer completed.");
            console.log(`Hours to add: ${timeToAdd}`);
            console.log(
                `New Hours: ${
                    currentTask.task_details.hours_worked + timeToAdd
                }`
            );
        }
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
                setTimerLength: setTimerLength,
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
