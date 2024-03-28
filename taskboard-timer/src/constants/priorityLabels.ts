export const PriorityLabels: { [key: string]: string } = {
    WONT_HAVE: "Won't Have",
    COULD_HAVE: "Could Have",
    SHOULD_HAVE: "Should Have",
    MUST_HAVE: "Must Have",
};

type ReverseMapping = { [key: string]: string };

const ReversePriorityLabels: ReverseMapping = Object.entries(
    PriorityLabels
).reduce((accumulator: ReverseMapping, [key, value]) => {
    accumulator[value] = key;
    return accumulator;
}, {});

// Function to get enum key from value
export const getPriorityEnumKey = (label: string): string | null => {
    return ReversePriorityLabels[label] || null;
};
