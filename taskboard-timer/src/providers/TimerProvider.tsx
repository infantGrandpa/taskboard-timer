import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface TimerContextType {
    timeLeft: number;
    timerActive: boolean;
    unpauseTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType>({
    timeLeft: 20 * 60, // Default time (20 minutes)
    timerActive: false,
    unpauseTimer: () => {},
    pauseTimer: () => {},
    resetTimer: () => {},
});

interface Props {
    children: ReactNode;
}

const TimerProvider = ({ children }: Props) => {
    const secsOnTimer = 20 * 60; //20 minutes
    const [timeLeft, setTimeLeft] = useState(secsOnTimer);
    const [timerActive, setTimerActive] = useState(false);

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

    return (
        <TimerContext.Provider
            value={{
                timeLeft,
                timerActive,
                unpauseTimer,
                pauseTimer,
                resetTimer,
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
