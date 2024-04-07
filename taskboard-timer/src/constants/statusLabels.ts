export const StatusLabels: { [key: string]: string } = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    REVIEW: "Review",
    COMPLETE: "Complete",
};

type ReverseMapping = { [key: string]: string };

const ReverseStatusLabels: ReverseMapping = Object.entries(StatusLabels).reduce(
    (accumulator: ReverseMapping, [key, value]) => {
        accumulator[value] = key;
        return accumulator;
    },
    {}
);

// Use this to convert "To Do" into "TODO"
export const getStatusEnumKey = (label: string): string | null => {
    return ReverseStatusLabels[label] || null;
};

export const getStatusByIndex = (index: number): string => {
    const statusValues = Object.values(StatusLabels);
    return statusValues[index];
};

export const getStatusIndex = (status: string): number => {
    const isEnumKey = status in StatusLabels;
    const statusLabel = isEnumKey ? StatusLabels[status] : status;

    const statusValues = Object.values(StatusLabels);
    const index = statusValues.findIndex((value) => value === statusLabel);
    return index;
};

export const getStatusLabel = (enumKey: string): string => {
    return StatusLabels[enumKey];
};

export const getNextStatus = (status: string): string | null => {
    console.log(`Current Status: ${status}`);
    const newStatus = incrementStatus(status, 1);
    console.log(`New Status: ${newStatus}`);
    return newStatus;
};

export const getPreviousStatus = (status: string): string | null => {
    console.log(`Current Status: ${status}`);
    const newStatus = incrementStatus(status, -1);
    console.log(`New Status: ${newStatus}`);
    return newStatus;
};

const incrementStatus = (
    statusToIncrement: string,
    incrementBy: number
): string | null => {
    const currentIndex = getStatusIndex(statusToIncrement);

    // Check if the current status is not found
    if (currentIndex === -1) {
        return null;
    }

    const totalStatuses = Object.values(StatusLabels).length;
    const nextStatusIndex =
        (((currentIndex + incrementBy) % totalStatuses) + totalStatuses) %
        totalStatuses;

    // Get the next status label using the next index
    const nextStatusLabel = getStatusByIndex(nextStatusIndex);

    return nextStatusLabel;
};
