import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { SprintTask } from "../constants/sprintTasks";
import { editTask } from "../services/taskService";
import { TaskCreationData } from "../constants/tasks";

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
    const [secsOnTimer, setSecsOnTimer] = useState(20 * 60); //20 minutes
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
        setSecsOnTimer(totalSeconds);
        setTimeLeft(totalSeconds);
    };

    const handleTimerComplete = () => {
        if (!currentTask) {
            return;
        }

        const timeToAdd = secsOnTimer - timeLeft;
        const hoursToAdd = convertTimerSecondsToHours(timeToAdd);

        handleUpdateTaskHours(hoursToAdd);
    };

    const convertTimerSecondsToHours = (seconds: number) => {
        const minutes = seconds / 60;
        const hours = minutes / 60;
        return hours;
    };

    const handleUpdateTaskHours = async (hoursToAdd: number) => {
        if (!currentTask) {
            return;
        }

        const newTaskData: TaskCreationData = {
            project_id: currentTask.task_details.project_id,
            name: currentTask.task_details.name,
            estimated_hours: currentTask.task_details.estimated_hours,
            hours_worked: hoursToAdd + currentTask.task_details.hours_worked,
        };

        try {
            await editTask(currentTask.task_details, newTaskData);
        } catch (error) {
            console.error(
                `Error editing task ${currentTask.task_details.id}: ${error}`
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
