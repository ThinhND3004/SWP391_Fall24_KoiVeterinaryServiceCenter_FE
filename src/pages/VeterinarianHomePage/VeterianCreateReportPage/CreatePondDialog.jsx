import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
import { GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import AddIcon from '@mui/icons-material/Add';
import Label from '~/components/Label.component';
import TextInput from '~/components/TextInput.component';
import NumberInput from '~/components/NumberInput.component';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function CreatePondDialog({ setPond, edit }) {
    const [open, setOpen] = useState(false);

    const [pondName, setPondName] = useState('');
    const [size, setSize] = useState(0);
    const [depth, setDepth] = useState(0);
    const [waterType, setWaterType] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [pHLevel, setPHLevel] = useState(0);
    const [lastMaintenanceDate, setLastMaintenanceDate] = useState(null);


    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., send data to an API
        setPond({
            name: pondName,
            sizeSquareMeters: size,
            depthMeters: depth,
            waterType: waterType,
            temperatureCelsius: temperature,
            pHLevel: pHLevel,
            lastMaintenanceDate: lastMaintenanceDate ? lastMaintenanceDate.format('YYYY-MM-DD') : null
        })
        // Optionally reset the form or close the dialog
        setOpen(false);
    };


    return (
        <Box>
            
            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: ORANGE_COLOR, borderRadius: '10px', color: '#fff' }}
                onClick={handleClickOpen}
            >
                {edit ? 'Edit' : <AddIcon sx={{ fontSize: '14px' }} />}
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="booking-dialog-title"
                PaperProps={{
                    sx: { width: '50%' }
                }}>
                <DialogTitle sx={{ marginBottom: '5px' }}>
                    Create Pond
                </DialogTitle>

                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Labels and Inputs in the Same Column */}
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Pond Name'} />
                            <TextInput label={'Pond Name'} value={pondName} setValue={setPondName} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Size (m²)'} />
                            <NumberInput label={'Size (m²)'} value={size} setValue={setSize} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Depth (m)'} />
                            <NumberInput label={'Depth (m)'} value={depth} setValue={setDepth} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Water Type'} />
                            <TextInput label={'Water Type'} value={waterType} setValue={setWaterType} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Temperature (°C)'} />
                            <NumberInput label={'Temperature (°C)'} value={temperature} setValue={setTemperature} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'pH Level'} />
                            <NumberInput label={'pH Level'} value={pHLevel} setValue={setPHLevel} />
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ width: '100%', gap: 2 }}>
                            <Label label={'Last Maintenance'} />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label='Date' defaultValue={lastMaintenanceDate} onChange={setLastMaintenanceDate} />
                            </LocalizationProvider>
                        </Box>
                        {/* Submit Button */}
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Box>
                </DialogContent>

                <DialogActions>
                  
                </DialogActions>
            </Dialog >
        </Box >
    )
}

export default CreatePondDialog;