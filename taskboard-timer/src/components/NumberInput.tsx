import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
    initialValue?: number;
    min?: number;
    max?: number;
}

const NumberInput = ({
    initialValue = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
}: Props) => {
    const [value, setValue] = useState<Number | String>(initialValue);

    const handleIncrement = () =>
        setValue((prevValue) => {
            const newValue = Math.min(max, Number(prevValue) + 1);
            return newValue.toString();
        });

    const handleDecrement = () =>
        setValue((prevValue) => {
            const newValue = Math.max(min, Number(prevValue) - 1);
            return newValue.toString();
        });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newValue = event.target.value;

        if (newValue === "" || newValue.trim() === "") {
            setValue(0);
            return;
        }

        const decimalRegex = /^\d*\.?\d*$/;
        if (decimalRegex.test(newValue)) {
            setValue(newValue);
        }
    };

    return (
        <Box
            sx={{ display: "flex", alignItems: "center", width: "max-content" }}
        >
            <TextField
                type="text"
                value={value}
                onChange={handleChange}
                variant="filled"
                label="Est. Hours"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Stack direction="column">
                                <Button
                                    onClick={handleIncrement}
                                    size="small"
                                    variant="outlined"
                                    tabIndex={-1}
                                    sx={{
                                        maxWidth: "48px",
                                        minWidth: "32px",
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                >
                                    <KeyboardArrowUpIcon fontSize="small" />
                                </Button>
                                <Button
                                    onClick={handleDecrement}
                                    size="small"
                                    variant="outlined"
                                    tabIndex={-1}
                                    sx={{
                                        maxWidth: "48px",
                                        minWidth: "32px",
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                    }}
                                >
                                    <KeyboardArrowDownIcon fontSize="small" />
                                </Button>
                            </Stack>
                        </InputAdornment>
                    ),
                    sx: { paddingRight: 0 },
                }}
                sx={{ maxWidth: "200px" }}
            />
        </Box>
    );
};

export default NumberInput;
