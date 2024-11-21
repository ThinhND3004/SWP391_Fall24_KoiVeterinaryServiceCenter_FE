/* eslint-disable indent */
import { Box, Typography, TextField } from "@mui/material";
import { BLUE_COLOR, INPUT_FIELD_COLOR } from "~/theme";

export default function NumberInput({ value, setValue, minRange, maxRange }) {
    const handleChange = (event) => {
        const value = event.target.value;
        if (!minRange) minRange = 0;
        if (value >= minRange) {
            if (!maxRange || value <= maxRange) {
                setValue(value);
            }
        }
        else setValue(minRange)
    }

    return (
        <TextField
            id="outlined-basic"
            placeholder={'Number'}
            variant="outlined"
            type="number"
            value={value}
            onChange={handleChange}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // width: '400px',
                width: '120px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    borderColor: BLUE_COLOR,
                    height: '60px',
                    marginTop: '15px',
                    '&.Mui-focused fieldset': {
                        borderColor: BLUE_COLOR
                    }
                },
                '& input': {
                    backgroundColor: INPUT_FIELD_COLOR,
                    padding: '20px 15px',
                    fontSize: '16px',
                    borderRadius: '15px'
                }
            }}
        />

    )
}