/* eslint-disable indent */
import { Box, Button, Typography } from '@mui/material'
import BookingDetails from './BookingDetails';
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import KoiSpeciesDialog from './KoiSpeciesDialog';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import CreatePondDialog from './CreatePondDialog';
import Label from '~/components/Label.component';
import TextAreaComponent from '~/components/TextArea.component';
import PrescriptionsDialog from './PrescriptionsDialog';
import NumberInput from '~/components/NumberInput.component';
import ManagementApi from '~/api/ManagementApi';
import { useNavigate } from 'react-router-dom';


function CreateReportPage({ booking }) {
    const [addKoiSpecies, setAddKoiSpecies] = useState([]);
    const [pond, setPond] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();


    const handleAddClick = (addItem) => {
        setAddKoiSpecies(prevKoiSpecies => [...prevKoiSpecies, addItem]);
    }

    const handleMedicineAdd = (addItem) => {
        setMedicines(prevMedicine => [...prevMedicine, addItem]);
    }

    const handleMedicineRemove = (index) => {
        const updatedItems = [...medicines];
        updatedItems.splice(index, 1);
        setMedicines(updatedItems);
    }

    const handleRemoveItem = (index) => {
        const updatedItems = [...addKoiSpecies];
        updatedItems.splice(index, 1);
        setAddKoiSpecies(updatedItems);
    }

    const handleQuantityChange = (data, index) => {
        const inputData = [...medicines];
        inputData[index].quantity = data;
        setMedicines(inputData)
    }

    const handleSave = async () => {
        const requestBody = {
            "bookingId": booking.id,
            "koiSpeciesIdList": addKoiSpecies.length > 0 ? addKoiSpecies.map((item) => item.id) : null,
            "createPondDto": pond ? {
                "customer_id": booking.customerId,
                "name": pond.name,
                "size_square_meters": pond.sizeSquareMeters,
                "depth_meters": pond.depthMeters,
                "water_type": pond.waterType,
                "temperature_celsius": pond.temperatureCelsius,
                "pH_level": pond.pHLevel,
                "last_maintenance_date": pond.lastMaintenanceDate
            } : null,
            "prescriptions": medicines.length > 0 ? medicines.map((item) => {
                return {
                    "medicineId": item.id,
                    "amount": item.quantity ? item.quantity : 1
                }
            }) : null,
            "diagnosis": diagnosis,
            "notes": notes
        }

        const result = await ManagementApi.createReport(requestBody);
        if (result) navigate(-1);

    }


    return (
        <Box component="form" gap={10}>
            {/* KOI SPECIES */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Label label='Koi Species' /> */}
                <Typography sx={{ fontSize: 16, fontWeight: 500, pr: 10 }}>Koi Species:</Typography>

                <Box display="flex" gap={5} alignItems="center">
                    {addKoiSpecies.map((item, index) => (
                        <Box
                            key={item.id}
                            display="flex"
                            gap={1}
                            alignItems="center"
                        >
                            <Typography sx={{ fontWeight: 400, fontSize: 16 }}>{item.name}</Typography>
                            <Button color="black" onClick={() => handleRemoveItem(index)}>
                                <ClearIcon />
                            </Button>
                        </Box>
                    ))}
                    <KoiSpeciesDialog addKoiSpecies={addKoiSpecies} onAddClick={handleAddClick} />
                </Box>
            </Box>

            {/* POND */}
            <Box display={'flex'} mt={5}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, pr: 10 }}>Pond:</Typography>
                <Box display={'block'} gap={1}>
                    {pond ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 8 }}>
                            {/* <Typography variant="body1"><strong>Pond Name:</strong> {pond.name}</Typography> */}
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Pond Name: {pond.name}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Size (m²): {pond.sizeSquareMeters}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Depth (m): {pond.depthMeters}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Water Type: {pond.waterType}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Temperature (°C): {pond.temperatureCelsius}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>pH Level: {pond.pHLevel}</Typography>
                            <Typography variant="body1" sx={{ fontSize: 16 }}>Last Maintenance: {pond.lastMaintenanceDate}</Typography>

                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <CreatePondDialog setPond={setPond} edit={true} />
                                <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: ORANGE_COLOR, borderRadius: '14px', color: '#fff', width: '100px' }}
                                    onClick={() => setPond(null)}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                        :
                        <CreatePondDialog setPond={setPond} />
                    }
                </Box>

            </Box>

            {/* DIAGNOSIS */}
            <Box display={'flex'} mt={5}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, pr: 10 }}>Diagnosis:</Typography>
                {/* <Label label={'Diagnosis'} /> */}
                <TextAreaComponent value={diagnosis} setValue={setDiagnosis} />
            </Box>

            {/* NOTES */}
            <Box display={'flex'} mt={5}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, pr: 14 }}>Notes:</Typography>
                <TextAreaComponent value={notes} setValue={setNotes} />
            </Box>

            {/* PRESCRIPTION */}
            <Box display={'flex'} mt={5}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, pr: 10, position: 'relative', top: 30 }}>Prescription:</Typography>
                <Box display={'flex'} gap={1} justifyContent={'center'} alignItems={'center'}>
                    {medicines.map((item, index) => {
                        return (
                            <Box
                                key={index}
                                display="flex"
                                gap={2}
                            // justifyContent="center"
                            // alignItems="center"
                            >
                                <Typography sx={{ fontWeight: 400, fontSize: 16, position: 'relative', top: 30 }}>{item.name}</Typography>
                                <NumberInput value={item.quantity} setValue={(e) => handleQuantityChange(e, index)} />
                                <Button color="black" onClick={() => handleMedicineRemove(index)}>
                                    <ClearIcon />
                                </Button>
                            </Box>

                        )
                    })}
                    <Box>
                        <PrescriptionsDialog addMedicines={medicines} handleMedicineAdd={handleMedicineAdd} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, mb: 6 }}>
                <Button variant="contained" sx={{ padding: '10px', minWidth: 'auto', boxShadow: 'none', bgcolor: BLUE_COLOR, borderRadius: '30px', color: '#fff', width: '200px', height: '60px' }}
                    onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Box>
    )
}
export default CreateReportPage;