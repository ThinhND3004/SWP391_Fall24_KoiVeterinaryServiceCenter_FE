import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NumberInput from "~/components/NumberInput.component";
import { BLUE_COLOR, INPUT_FIELD_COLOR } from "~/theme";

function VerterianProfile() {
    const [education, setEducation] = useState('')
    const [yearOfExperience, setYearOfExperience] = useState('');
    const [certification, setCertification] = useState('')

    return (
        <Box>
            <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>

                <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Education</Typography>
                    <TextField
                        id="outlined-basic"
                        placeholder='Enter your education'
                        value={education}
                        variant="outlined"
                        onChange={(event) => { setEducation(event.target.value) }}
                        sx={{
                            width: '800px',
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
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Year of Experience</Typography>
                    <TextField
                        id="outlined-basic"
                        value={yearOfExperience}
                        onChange={(event) => { setYearOfExperience(event.target.value) }}
                        variant="outlined"
                        type="number" // Set input type to number
                        slotProps={{ inputProps: { min: 0, max: 100 } }}
                        // inputProps={{ min: 0, pattern: "[0-9]*" }} // Optional: set min or pattern
                        sx={{
                            width: '200px',
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
                    ></TextField>
                </Box>
            </Box>

            <Box sx={{ mt: 5, mb: '80px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Certification</Typography>
                <TextField
                    id="outlined-basic"
                    placeholder='Enter your certification'
                    value={certification}
                    onChange={(event) => { setCertification(event.target.value) }}
                    variant="outlined"
                    type='text'
                    multiline
                    minRows={1} // Minimum rows to show initially
                    maxRows={5} // Maximum rows before scroll appears
                    sx={{
                        width: '1090px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                            borderColor: BLUE_COLOR,
                            marginTop: '15px',
                            '&.Mui-focused fieldset': {
                                borderColor: BLUE_COLOR
                            }
                        },
                        '& input, & textarea': { // Apply styles to both input and textarea
                            backgroundColor: INPUT_FIELD_COLOR,
                            padding: '20px 15px',
                            fontSize: '16px',
                            borderRadius: '15px',
                            height: 'auto' // Let the height adjust based on content
                        }
                    }}
                />
            </Box>

        </Box>

    )
}

export default VerterianProfile;