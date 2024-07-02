const convertSecondsToHours = (seconds: number) => {
    const minutes = seconds / 60;
    const hours = minutes / 60;
    return hours;
};

const convertHoursToSeconds = (hours: number) => {
    const minutes = hours * 60;
    const seconds = minutes * 60;
    return seconds;
};

export { convertHoursToSeconds, convertSecondsToHours };
