type Labels = { [key: string]: string };

// Use this to convert "To Do" into "TODO"
const getEnumKeyFromLabel = (label: string, Labels: Labels): string | null => {
    if (label in Labels) {
        return label;
    }

    const newLabels = Object.entries(Labels).reduce(
        (accumulator: Labels, [key, value]) => {
            accumulator[value] = key;
            return accumulator;
        },
        {}
    );

    return newLabels[label];
};

const getLabelByIndex = (index: number, Labels: Labels): string => {
    const values = Object.values(Labels);
    return values[index];
};

const getLabelIndex = (label: string, Labels: Labels): number => {
    const isEnumKey = label in Labels;
    const actualLabel = isEnumKey ? Labels[label] : label;
    const values = Object.values(Labels);
    return values.findIndex((value) => value === actualLabel);
};

// Use this to convert "TODO" into "To Do"
const getLabelByEnumKey = (enumKey: string, Labels: Labels): string => {
    return Labels[enumKey];
};

const incrementLabel = (
    labelToIncrement: string,
    incrementBy: number,
    Labels: Labels
): string | null => {
    const currentIndex = getLabelIndex(labelToIncrement, Labels);

    if (currentIndex === -1) {
        return null;
    }

    const totalLabels = Object.values(Labels).length;
    const nextIndex =
        (((currentIndex + incrementBy) % totalLabels) + totalLabels) %
        totalLabels;

    return getLabelByIndex(nextIndex, Labels);
};

const getNextLabel = (label: string, Labels: Labels): string | null => {
    const newLabel = incrementLabel(label, 1, Labels);
    return newLabel;
};

const getPreviousLabel = (label: string, Labels: Labels): string | null => {
    const newLabel = incrementLabel(label, -1, Labels);
    return newLabel;
};

export {
    getEnumKeyFromLabel,
    getLabelByEnumKey,
    getNextLabel,
    getPreviousLabel,
    getLabelIndex,
    getLabelByIndex,
};
