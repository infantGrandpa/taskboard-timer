import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

interface Column {
    field: string;
    label: string;
}

interface Props {
    data: Record<string, any>[];
    columns: Column[];
}

const DynamicTable = ({ data, columns }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>
                                    {row[column.field].toString()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DynamicTable;
