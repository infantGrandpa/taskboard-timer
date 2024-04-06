import { format } from "date-fns";

interface Props {
    startDate: Date | null;
    endDate: Date | null;
    dateFormat?: string;
}

const DateRange = ({
    startDate,
    endDate,
    dateFormat = "MMM dd, yyyy",
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
        <span>
            {startDate && formatDate(startDate)}
            {startDate && endDate && "\u2013" /* &ndash; "–" */}
            {endDate && formatDate(endDate)}
        </span>
    );
};

export default DateRange;
