import { Box, Button, Typography } from '@mui/material'
import BookingDetails from './BookingDetails';
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme';
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
        if(result) navigate(-1);

    }


    return (
        <Box component="form" gap={10}>
            {/* KOI SPECIES */}
            <Box display={'flex'} >
                <Label label='Koi Species' />
                <Box display={'block'} gap={1}>
                    {addKoiSpecies.map((item, index) => {
                        return (
                            <Box key={item.id} display={'flex'} gap={1} justifyContent="center" alignItems="center">
                                <Typography>{item.name}</Typography>
                                <Button color={'black'} onClick={() => handleRemoveItem(index)}>
                                    <ClearIcon />
                                </Button>
                            </Box>
                        )
                    })}
                    <KoiSpeciesDialog addKoiSpecies={addKoiSpecies} onAddClick={handleAddClick} />
                </Box>
            </Box>

            {/* POND */}
            <Box display={'flex'} >
                <Typography marginRight={'5px'} sx={{ fontWeight: 600, fontSize: 18 }}>Pond: </Typography>

                <Box display={'block'} gap={1}>
                    {pond ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid black', padding: '10px' }}>
                            <Typography variant="body1"><strong>Pond Name:</strong> {pond.name}</Typography>
                            <Typography variant="body1"><strong>Size (m²):</strong> {pond.sizeSquareMeters}</Typography>
                            <Typography variant="body1"><strong>Depth (m):</strong> {pond.depthMeters}</Typography>
                            <Typography variant="body1"><strong>Water Type:</strong> {pond.waterType}</Typography>
                            <Typography variant="body1"><strong>Temperature (°C):</strong> {pond.temperatureCelsius}</Typography>
                            <Typography variant="body1"><strong>pH Level:</strong> {pond.pHLevel}</Typography>
                            <Typography variant="body1"><strong>Last Maintenance:</strong> {pond.lastMaintenanceDate}</Typography>
                            <CreatePondDialog setPond={setPond} edit={true} />
                            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: ORANGE_COLOR, borderRadius: '10px', color: '#fff' }}
                                onClick={() => setPond(null)}
                            >
                                Cancel
                            </Button>
                        </Box>
                        :
                        <CreatePondDialog setPond={setPond} />
                    }
                </Box>

            </Box>

            {/* DIAGNOSIS */}
            <Box display={'flex'}>
                <Label label={'Diagnosis'} />
                <TextAreaComponent value={diagnosis} setValue={setDiagnosis} />
            </Box>

            {/* NOTES */}
            <Box display={'flex'}>
                <Label label={'Notes'} />
                <TextAreaComponent value={notes} setValue={setNotes} />
            </Box>

            {/* PRESCRIPTION */}
            <Box display={'flex'}>
                <Label label={'Prescriptions'} />
                <Box display={'block'} gap={1}>
                    {medicines.map((item, index) => {
                        return (
                            <Box key={index} display={'flex'} gap={1} justifyContent="center" alignItems="center">
                                <Typography>{item.name}</Typography>
                                <NumberInput value={item.quantity} setValue={(e) => handleQuantityChange(e, index)} />
                                <Button color={'black'} onClick={() => handleMedicineRemove(index)}>
                                    <ClearIcon />
                                </Button>
                            </Box>
                        )
                    })}
                    <PrescriptionsDialog addMedicines={medicines} handleMedicineAdd={handleMedicineAdd} />
                </Box>
            </Box>
            <Button variant="contained" sx={{ padding: '6px', minWidth: 'auto', boxShadow: 'none', bgcolor: ORANGE_COLOR, borderRadius: '10px', color: '#fff' }}
                onClick={handleSave}
            >
                Save
            </Button>
        </Box>
    )
}
export default CreateReportPage;