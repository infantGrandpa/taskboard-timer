import { Typography, TypographyProps } from "@mui/material";
import { format } from "date-fns";

interface Props extends TypographyProps {
    startDate: Date;
    endDate: Date;
    dateFormat?: string;
}

const DateRange = ({
    startDate,
    endDate,
    dateFormat = "MMM dd, yyyy",
    ...typographyProps
}: Props) => {
    if (!startDate || !endDate) {
        return;
    }

    return (
        <Typography {...typographyProps}>
            {format(new Date(startDate), dateFormat)}
            &ndash;
            {format(new Date(endDate), dateFormat)}
        </Typography>
    );
};

export default DateRange;
