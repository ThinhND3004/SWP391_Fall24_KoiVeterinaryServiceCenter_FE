import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { useState } from "react";
import ManagementApi from '~/api/ManagementApi';
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme';
import TimeUtils from '~/utils/TimeUtils';

export default function CustomerReportDialog({ bookingId }) {
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState(null); // Keep null until data is fetched

    const fetchReport = async () => {
        const data = await ManagementApi.getReportByBookingId({ bookingId: bookingId });
        console.log("REPORT: ", data);
        setReport(data);
    };

    const handleOpen = async () => {
        setOpen(true);
        await fetchReport(); // Fetch data when opening the dialog
    };

    return (
        <Box>
             <button
                style={{
                    width: '200px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    backgroundColor: BLUE_COLOR,
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
                onClick={handleOpen}
            >
                View Report
            </button>
           
            <Box>
                <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="booking-dialog-title" PaperProps={{
                    sx: {
                        bgcolor: INPUT_FIELD_COLOR,
                        borderRadius: '20px',
                        padding: 2,
                        minHeight: '50vh', // Adjust height as needed
                        minWidth: '50vw', // Adjust width as needed
                    }
                }}>
                    <DialogTitle sx={{
                        marginBottom: '5px',
                        mt: 2
                    }}>
                        <Typography sx={{ fontWeight: 500, fontSize: 30, fontFamily: 'SVN-Konga Pro', color: BLUE_COLOR }}>
                            Report Information
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        {report ? ( // Render content only if report is loaded
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Koi Species */}
                                <Typography><strong>Koi Species:</strong></Typography>
                                {report.koiSpeciesDtoList && report.koiSpeciesDtoList.length > 0 ? (
                                    <Box>
                                        <Typography>
                                            {report.koiSpeciesDtoList.map((koiSpecies, index) => (
                                                <span key={index}>{koiSpecies.name}<br /></span>
                                            ))}
                                        </Typography>
                                    </Box>
                                ) : <Typography>No Koi Species Data</Typography>}

                                {/* Pond */}
                                <Typography><strong>Pond:</strong></Typography>
                                {report.pondDto ? (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 8 }}>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Pond Name: {report.pondDto.name}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Size (m²): {report.pondDto.sizeSquareMeters}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Depth (m): {report.pondDto.depthMeters}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Water Type: {report.pondDto.waterType}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Temperature (°C): {report.pondDto.temperatureCelsius}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>pH Level: {report.pondDto.phlevel}</Typography>
                                        <Typography variant="body1" sx={{ fontSize: 16 }}>Last Maintenance: {report.pondDto.lastMaintenanceDate}</Typography>
                                    </Box>
                                ) : <Typography>No Pond Data</Typography>}

                                {/* PRESCRIPTIONS */}
                                <Typography><strong>Prescriptions:</strong></Typography>
                                {report.prescriptionDto ? (
                                    <Box>
                                        <Typography>
                                            {report.prescriptionDto.prescriptionMedicineDto.map((pm, index) => (
                                                <span key={index}>{pm.medicineName} : {pm.amount}<br /></span>
                                            ))}
                                        </Typography>
                                    </Box>
                                ) : <Typography>No Prescription Data</Typography>}

                                {/* DIAGNOSIS */}
                                <Typography><strong>Diagnosis:</strong> </Typography>
                                <Typography>{report.diagnosis || "No Diagnosis Data"}</Typography>

                                {/* NOTES */}
                                <Typography><strong>Notes:</strong> </Typography>
                                <Typography>{report.notes || "No Notes"}</Typography>

                                {/* CREATED AT */}
                                <Typography><strong>Created at:</strong> {report.createdAt ? TimeUtils.formatDateTime(report.createdAt) : "No Date Available"}</Typography>
                            </Box>
                        ) : (
                            <Typography>Loading Report...</Typography> // Show loading message if data isn't loaded
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpen(false)} sx={{ bgcolor: BLUE_COLOR, borderRadius: '30px', width: '120px', height: '40px' }}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}
