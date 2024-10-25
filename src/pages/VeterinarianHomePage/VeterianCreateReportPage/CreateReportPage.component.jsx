import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateReportPage from './CreateReportPage';
import BookingDetails from './BookingDetails';

function CreateReportPageComponent() {
    const location = useLocation(); 
    const navigate = useNavigate();
    const { booking } = location.state || {};
    console.log(booking)

    const handleLinkClick = () => {
        navigate(-1);
    }


    return (
        <Box marginLeft={'250px'} display={'flex'} flexDirection={'column'} gap={'100px'} px={'30px'} position={'relative'}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Breadcrumbs aria-label="breadcrumb">

                    <Button
                        onClick={handleLinkClick}
                        sx={{
                            color: 'mediumblue',
                             alignItems: 'center', 
                             padding: '0', 
                             '&:hover': {
                                borderBottom: '2px solid mediumblue', 
                            },
                        }}
                    >
                        <ArrowBackIcon fontSize='small' />
                        Back
                    </Button>

                    <Typography sx={{
                        fontWeight: 600, fontSize: '20px'
                    }}
                    >
                        Create Report
                    </Typography>
                </Breadcrumbs>
            </Box>
            < BookingDetails booking={booking}/>
            < CreateReportPage booking={booking} />
        </Box>
        )
}
export default CreateReportPageComponent