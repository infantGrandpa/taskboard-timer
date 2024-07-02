export const playAlarmSound = () => {
    const alarmFile = "chime_clickbell_melody_alarm.wav";
    playSound(alarmFile);
};

const playSound = (fileName: string) => {
    const audio = new Audio(`/sounds/${fileName}`);
    audio.play();
};
