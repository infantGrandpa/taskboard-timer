import { Typography, TypographyProps } from "@mui/material";
import { format } from "date-fns";

interface Props extends TypographyProps {
    startDate: Date | null;
    endDate: Date | null;
    dateFormat?: string;
}

const DateRange = ({
    startDate,
    endDate,
    dateFormat = "MMM dd, yyyy",
    ...typographyProps
}: Props) => {
    const formatDate = (dateToFormat: Date) => {
        const date = new Date(dateToFormat); //We get an error if we directly use dateToFormat.getTime()
        const adjustedDate = new Date(
            date.getTime() + date.getTimezoneOffset() * 60000
        );
        const formattedDate = format(adjustedDate, dateFormat);
        return formattedDate;
    };

    return (
        <Typography {...typographyProps}>
            {startDate && formatDate(startDate)}
            {startDate && endDate && "\u2013" /* &ndash; "–" */}
            {endDate && formatDate(endDate)}
        </Typography>
    );
};

export default DateRange;
