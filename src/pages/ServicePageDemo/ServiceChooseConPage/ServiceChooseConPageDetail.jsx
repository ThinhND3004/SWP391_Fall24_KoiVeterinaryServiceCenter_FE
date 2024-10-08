import { Box, ListItem, ListItemText, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Button } from 'react-bootstrap'
import { BLACK_COLOR, BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR } from '~/theme'
import { List } from '@mui/material';
import Grid from '@mui/material/Grid2';

const SerivceChooseCon = () => {
    return (
        <div>
            <Box alignItems={'center'} display={'flex'} flexDirection={'row'} gap={'100px'} px={'30px'}
                sx={{

                    backgroundColor: INPUT_FIELD_COLOR,
                    height: '400px',
                    width: '1400px'

                }}
            >
                {/* avt-btn */}
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >

                    <img
                        style={{ height: '200px', width: '200px', borderRadius: '50%', marginBottom: '20px' }}
                        src="https://img.freepik.com/premium-photo/beautiful-painting-three-colorful-koi-fish
                                                -are-swimming-pet-generative-ai-illustration_132416-8965.jpg"
                        alt="Account image"
                    />

                    <Button
                        style={{
                            height: '50px',
                            width: '150px',
                            borderRadius: '30px',
                            backgroundColor: BLUE_COLOR,
                            color: 'white',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center', // Centers content horizontally
                            alignItems: 'center',
                            padding: '0px 9px'  // Smooth background color transition
                        }}>
                        Detail
                    </Button>
                </Box>

                {/* info */}
                <Box>
                    <Typography>
                        Là giảng viên tại ĐH Y Hà Nội <br />
                        Đã làm việc tại .... <br />
                        Bao nhiêu năm kinh nghiệm <br />
                        Địa điểm: Hà Nội
                    </Typography>
                </Box>

                {/* schedule */}
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                backgroundColor: INPUT_FIELD_COLOR,
                                width: '200px',
                            }}
                        />
                    </LocalizationProvider>

                    <Box
                        sx={{
                            marginTop: '10px',
                            width: '700px',
                            padding: '20px',
                            maxHeight: '100px', // Set a max height for the container
                            overflowY: 'auto',  // Enable vertical scrollbar when content overflows
                            border: '1px solid #ccc', // Optional: Add a border to define the scrollable area
                            borderRadius: '8px', // Optional: Round the corners of the container
                        }}
                    >

                        <Grid container spacing={2}
                        >
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4}>
                                <Button
                                    style={{

                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>
                            <Grid item size={4} >
                                <Button
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        color: GRAY_COLOR,
                                        borderRadius: 20,
                                        border: '1px solid grey'

                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => alert(`You selected`)}
                                >
                                    10h30 - 11h30
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>

                </Box>
            </Box>
        </div>
    )
}

export default SerivceChooseCon


