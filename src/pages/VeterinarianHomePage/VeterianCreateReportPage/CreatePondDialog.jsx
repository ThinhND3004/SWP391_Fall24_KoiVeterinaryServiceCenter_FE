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
        if ((!pHLevel && pHLevel != 1) || pHLevel > 14) {
            if (!pHLevel && pHLevel != 1) {
                newError.pHLevel = 'pH level is required!';
            } else if (pHLevel > 14) {
                newError.pHLevel = 'pH level cannot be greater than 14!';
            }
        }
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
                        width: '650px',
                        bgcolor: INPUT_FIELD_COLOR,
                        borderRadius: '30px'
                    }
                }}>
                <DialogTitle sx={{
                    marginTop: 2
                }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 25, textAlign: 'center' }}>
                        Create Pond
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{
                    width: '650px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            marginLeft: 3
                        }}
                    >
                        {/* Pond Name */}
                        <Box alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 16, minWidth: '110px' }}>
                                Pond Name
                            </Typography>
                            <Box>
                                <TextInput
                                    label={'Pond Name'}
                                    value={pondName}
                                    setValue={setPondName}

                                />
                                {error.pondName && <span style={{ color: 'red', fontSize: '12px' }}>{error.pondName}</span>}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            {/* Size */}
                            <Box alignItems="center" gap={5}>
                                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                                    Size (m²)
                                </Typography>
                                <Box sx={{ alignItems: 'center' }}>
                                    <NumberInput
                                        label="Size (m²)"
                                        value={size}
                                        setValue={setSize}
                                    />
                                    {error.size && <span style={{ color: 'red', fontSize: '12px' }}>{error.size}</span>}
                                </Box>
                            </Box>

                            {/* Depth */}
                            <Box alignItems="center" gap={2}>
                                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                                    Depth (m)
                                </Typography>
                                <Box sx={{ alignItems: 'center' }}>
                                    <NumberInput
                                        label={'Depth (m)'}
                                        value={depth}
                                        setValue={setDepth}
                                    />
                                    {error.depth && <span style={{ color: 'red', fontSize: '12px' }}>{error.depth}</span>}
                                </Box>
                            </Box>

                            <Box alignItems="center" gap={2}>
                                <Typography sx={{ fontWeight: 500, fontSize: 16 }} >
                                    pH Level
                                </Typography>
                                <NumberInput
                                    label={'pH Level'}
                                    value={pHLevel}
                                    setValue={setPHLevel}
                                    minRange={1}
                                    maxRange={14}
                                />
                                {error.pHLevel && <span style={{ color: 'red', fontSize: '12px' }}>{error.pHLevel}</span>}
                            </Box>

                            <Box alignItems="center" gap={2} width={'300px'}>
                                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                                    Temperature
                                </Typography>
                                <NumberInput
                                    label={'Temperature (°C)'}
                                    value={temperature}
                                    setValue={setTemperature}
                                />
                                {error.temperature && <span style={{ color: 'red', fontSize: '14px' }}>{error.temperature}</span>}
                            </Box>
                        </Box>


                        {/* Water Type */}
                        <Box alignItems="center">
                            <Typography sx={{ fontWeight: 500, fontSize: 16, minWidth: '110px' }}>
                                Water Type
                            </Typography>
                            <Box sx={{ alignItems: 'center' }}>
                                <TextInput
                                    label={'Water Type'}
                                    value={waterType}
                                    setValue={setWaterType}
                                />
                                {error.waterType && <span style={{ color: 'red', fontSize: '12px' }}>{error.waterType}</span>}
                            </Box>
                        </Box>

                        {/* Last Maintenance */}
                        <Box alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 16, mb: 2 }}>
                                Last Maintenance
                            </Typography>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={lastMaintenanceDate}
                                        onChange={setLastMaintenanceDate}
                                        maxDate={dayjs()}
                                        sx={{
                                            width: '570px', // Đặt chiều rộng cố định
                                            '& .MuiOutlinedInput-root': {
                                                height: '55px',
                                                borderRadius: '14px'
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                                {error.lastMaintenanceDate && <span style={{ color: 'red', fontSize: '12px' }}>{error.lastMaintenanceDate}</span>}
                            </Box>
                        </Box>


                        {/* Submit Button */}
                        <Box display="flex">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: BLUE_COLOR,
                                    borderRadius: '30px',
                                    color: 'white',
                                    width: '100%',
                                    height: '50px',
                                    boxShadow: 'none',
                                    mt: 2
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default CreatePondDialog;
