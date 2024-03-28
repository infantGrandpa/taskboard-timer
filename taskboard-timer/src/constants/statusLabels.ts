export const StatusLabels: { [key: string]: string } = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    REVIEW: "Review",
    COMPLETE: "Complete",
};

type ReverseMapping = { [key: string]: string };

const ReverseStatusLabels: ReverseMapping = Object.entries(
    StatusLabels
).reduce((accumulator: ReverseMapping, [key, value]) => {
    accumulator[value] = key;
    return accumulator;
}, {});

// Function to get enum key from value
export const getStatusEnumKey = (label: string): string | null => {
    return ReverseStatusLabels[label] || null;
};
