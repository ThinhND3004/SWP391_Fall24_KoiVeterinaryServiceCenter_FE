import { Box, Breadcrumbs, Button, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateReportPage from './CreateReportPage';
import BookingDetails from './BookingDetails';
import { BLUE_COLOR } from '~/theme';

function CreateReportPageComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {};
    console.log(booking)

    const handleLinkClick = () => {
        navigate(-1);
    }


    return (
        <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'} position={'relative'}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Breadcrumbs aria-label="breadcrumb">

                    <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                        <Button
                            onClick={handleLinkClick}
                            sx={{
                                gap: 1,
                                color: BLUE_COLOR,
                                alignItems: 'center',
                                padding: '0',
                                '&:hover': {
                                    borderBottom: `2px solid ${BLUE_COLOR}`,
                                },
                            }}
                        >
                            <ArrowBackIcon fontSize='small' />
                            <Typography sx={{ fontSize: '20px', fontWeight: 500 }}>
                                Back
                            </Typography>
                        </Button>
                    </Box>

                    <Typography sx={{
                        fontWeight: 600, fontSize: '20px'
                    }}
                    >
                        Create Report
                    </Typography>
                </Breadcrumbs>
            </Box>

            < BookingDetails booking={booking} />
            < CreateReportPage booking={booking} />
        </Box>
    )
}
export default CreateReportPageComponent