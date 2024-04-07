export const PriorityLabels: { [key: string]: string } = {
    MUST_HAVE: "Must Have",
    SHOULD_HAVE: "Should Have",
    COULD_HAVE: "Could Have",
    WONT_HAVE: "Won't Have",
};

type ReverseMapping = { [key: string]: string };

const ReversePriorityLabels: ReverseMapping = Object.entries(
    PriorityLabels
).reduce((accumulator: ReverseMapping, [key, value]) => {
    accumulator[value] = key;
    return accumulator;
}, {});

// Use this to convert "Won't Have" into "WONT_HAVE"
export const getPriorityEnumKey = (label: string): string | null => {
    return ReversePriorityLabels[label] || null;
};

export const getPriorityByIndex = (index: number): string => {
    const priorityValues = Object.values(PriorityLabels);
    return priorityValues[index];
};
