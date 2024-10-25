import { Box, Typography, TextField } from "@mui/material";
import { BLUE_COLOR, INPUT_FIELD_COLOR } from "~/theme";

export default function NumberInput({ value, setValue }) {
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    
    return (
        <TextField
            id="outlined-basic"
            placeholder={`Enter...`}
            variant="outlined"
            type="number"
            value={value}
            onChange={handleChange}
            sx={{
                width: 100,
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