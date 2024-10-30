import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, OFFLINE_BUTTON, ONLINE_BUTTON, ORANGE_COLOR } from '~/theme'
import MeetingMethodTagHolder from './MethodMeetingTag';
import { useNavigate } from 'react-router-dom';



function ServiceBlock({ service }) {
  const navigate = useNavigate();

  const handleOnlineConsultantDetails = () => {
    localStorage.setItem("serviceId", service.id)
    navigate("/online-consultant", { state: { service } }); // Truyền state qua route
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '600px', borderRadius: '26px' }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '45px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'start'
            }}
          >
            {service.name}
          </Typography>

          {/* TAG FOR MEETING METHOD AND TYPE */}
          <MeetingMethodTagHolder meetingMethod={service.meetingMethod} serviceType={service.type} />

          {/* DESCRIPTION */}
          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>{service.overview}</Typography>

          {/* BUTTON LEARN MORE */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnlineConsultantDetails}
            sx={{
              marginTop: "20px",
              backgroundColor: BLUE_COLOR,
              color: "white",
            }}
          >
            Learn more
          </Button>

        </Box>
        <img src="https://d.newsweek.com/en/full/2466991/feeding-koi-fish.jpg?w=1200&f=c585a5744246a338fadb145a12b2849a" style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} />

      </Box>
    </div>
  )
}

export default ServiceBlock
