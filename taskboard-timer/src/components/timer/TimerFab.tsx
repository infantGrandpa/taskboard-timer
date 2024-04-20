import { Fab } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useState } from "react";
import TimerModal from "./TimerModal";

const TimerFab = () => {
    const [openTimer, setOpenTimer] = useState(false);

    const handleOpenTimer = () => {
        setOpenTimer(true);
    };

    const handleCloseTimer = () => {
        setOpenTimer(false);
    };

    return (
        <>
            <Fab
                size="large"
                color="primary"
                aria-label="Start Timer"
                onClick={handleOpenTimer}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    width: "100px",
                    height: "100px",
                }}
            >
                <AccessAlarmIcon sx={{ fontSize: "3rem" }} />
            </Fab>
            <TimerModal isOpen={openTimer} onClose={handleCloseTimer} />
        </>
    );
};

export default TimerFab;
