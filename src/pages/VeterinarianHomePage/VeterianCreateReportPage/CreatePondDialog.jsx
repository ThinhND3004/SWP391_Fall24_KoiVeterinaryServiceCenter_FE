/* eslint-disable indent */
/* eslint-disable semi */
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import AddIcon from '@mui/icons-material/Add';
import Label from '~/components/Label.component';
import TextInput from '~/components/TextInput.component';
import NumberInput from '~/components/NumberInput.component';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


function CreatePondDialog({ setPond, edit }) {
    const [open, setOpen] = useState(false);

    const [pondName, setPondName] = useState('');
    const [size, setSize] = useState(0);
    const [depth, setDepth] = useState(0);
    const [waterType, setWaterType] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [pHLevel, setPHLevel] = useState(0);
    const [lastMaintenanceDate, setLastMaintenanceDate] = useState(null);

    const [error, setError] = useState({});

    const handleValidation = () => {

        const newError = {};

        if (!pondName) newError.pondName = 'Pond name is required!';
        else if (pondName.length > 50) newError.pondName = 'Length of pond name must not exceed 50 letters';
        if (!size || size <= 0) newError.size = 'Size must be greater than 0!';
        if (!depth || depth <= 0) newError.depth = 'Depth must be greater than 0!';
        if (!waterType) newError.waterType = 'Water type is required!';
        if (!temperature && temperature != 0) newError.temperature = 'Temperature is required!';
        if (!pHLevel && pHLevel != 0) newError.pHLevel = 'pH level is required!';
        if (!lastMaintenanceDate) newError.lastMaintenanceDate = 'Last Maintenance is required!';

        setError(newError);

        return Object.keys(newError).length === 0;
    }

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setError({})
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {

            setPond({
                name: pondName,
                sizeSquareMeters: size,
                depthMeters: depth,
                waterType: waterType,
                temperatureCelsius: temperature,
                pHLevel: pHLevel,
                lastMaintenanceDate: lastMaintenanceDate ? lastMaintenanceDate.format('YYYY-MM-DD') : null
            })

            setOpen(false);
        }

    };


    return (
        <Box>

            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '14px', color: '#fff', width: '150px', height: '40px' }}
                onClick={handleClickOpen}
            >
                {edit ? 'Edit' :
                    <Typography>
                        Create pond
                    </Typography>}
            </Button>

            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="booking-dialog-title"
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        width: '800px',
                        maxWidth: '90%',
                        bgcolor: INPUT_FIELD_COLOR,
                        borderRadius: '30px'
                    }
                }}>
                <DialogTitle sx={{
                    marginTop: 4,
                    mb: 2
                }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 30, textAlign: 'center' }}>
                        Create Pond
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
                        {/* Labels and Inputs in the Same Column */}
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'Pond Name'} /> */}
                            <Typography sx={{ display: 'block', fontWeight: 500, fontSize: 20, minWidth: '100px' }}>
                                Pond Name
                            </Typography>
                            <TextInput label={'Pond Name'} value={pondName} width={'500px'} setValue={setPondName} sx={{ width: '300px' }} />
                        </Box>
                        {error.pondName && <span style={{ color: 'red' }}>{error.pondName}</span>}

                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ width: '100%', gap: 5 }}
                        >
                            <Typography sx={{ fontWeight: 500, fontSize: 20, minWidth: '100px' }}>
                                Size (m²)
                            </Typography>
                            <NumberInput
                                label="Size (m²)"
                                value={size}
                                width="100%"
                                setValue={setSize}
                                sx={{ maxWidth: '500px' }}
                            />
                        </Box>
                        {error.size && <span style={{ color: 'red' }}>{error.size}</span>}

                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'Depth (m)'} /> */}
                            <Typography sx={{ fontWeight: 500, fontSize: 20, minWidth: '100px' }}>
                                Depth (m)
                            </Typography>
                            <NumberInput label={'Depth (m)'} value={depth} width={'500px'} setValue={setDepth} />
                        </Box>
                        {error.depth && <span style={{ color: 'red' }}>{error.depth}</span>}

                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'Water Type'} /> */}
                            <Typography sx={{ fontWeight: 500, fontSize: 20 }}>
                                Water Type
                            </Typography>
                            <TextInput label={'Water Type'} value={waterType} setValue={setWaterType} />
                        </Box>
                        {error.waterType && <span style={{ color: 'red' }}>{error.waterType}</span>}

                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'Temperature (°C)'} /> */}
                            <Typography sx={{ fontWeight: 500, fontSize: 20 }}>
                                Temperature (°C)
                            </Typography>
                            <NumberInput label={'Temperature (°C)'} value={temperature} setValue={setTemperature} />
                        </Box>
                        {error.temperature && <span style={{ color: 'red' }}>{error.temperature}</span>}

                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'pH Level'} /> */}
                            <Typography sx={{ fontWeight: 500, fontSize: 20 }}>pH Level</Typography>
                            <NumberInput label={'pH Level'} value={pHLevel} setValue={setPHLevel} />
                        </Box>
                        {error.pHLevel && <span style={{ color: 'red' }}>{error.pHLevel}</span>}

                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 5 }}>
                            {/* <Label label={'Last Maintenance'} /> */}
                            <Typography sx={{ fontWeight: 500, fontSize: 20 }}>
                                Last Maintenance
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer
                                    components={['DatePicker']}
                                    variant='outlined'
                                    sx={{
                                        overflow: 'hidden',
                                        width: '500px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                            borderColor: BLUE_COLOR,
                                            height: '60px',
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
                                    }}>
                                    <DatePicker label='Date'
                                        defaultValue={lastMaintenanceDate} 
                                        onChange={setLastMaintenanceDate} 
                                        maxDate={dayjs()}
                                        sx={{
                                            marginTop: '15px',
                                            backgroundColor: INPUT_FIELD_COLOR,
                                            width: '400px',
                                            borderRadius: '15px'

                                        }} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        {error.lastMaintenanceDate && <span style={{ color: 'red' }}>{error.lastMaintenanceDate}</span>}

                        {/* Submit Button */}
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: BLUE_COLOR,
                                    borderRadius: '14px',
                                    color: 'white',
                                    width: '100px',
                                    height: '40px',
                                    mr: 6,
                                    mt: 5
                                }}
                            >
                                Submit
                            </Button>
                        </Box>

                    </Box>
                </DialogContent>

                <DialogActions>
                    {/* <Button type="submit" variant="contained" sx={{ bgcolor: BLUE_COLOR, borderRadius: '14px', color: 'white', width: '100px', height: '40px', mr: 6, mb: 3 }}>Submit</Button> */}
                </DialogActions>
            </Dialog >
        </Box >
    )
}

export default CreatePondDialog;