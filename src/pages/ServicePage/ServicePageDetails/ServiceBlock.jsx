import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, OFFLINE_BUTTON, ONLINE_BUTTON, ORANGE_COLOR } from '~/theme'
import MeetingMethodTagHolder from './MethodMeetingTag'
import { useNavigate } from 'react-router-dom'

function ServiceBlock({ service }) {
  const navigate = useNavigate()

  const serviceAddress = "Long Thanh My Ward, Thủ Đức, 71216, Vietnam"
  const handleOnlineConsultantDetails = () => {
    localStorage.setItem("serviceId", service.id)
    navigate("/online-consultant", { state: { service, serviceAddress } }) // Truyền state qua route
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
              borderRadius: '40px',
              width: '150px',
              height: '50px'
            }}
          >
            Learn more
          </Button>

        </Box>
        <img src={service.serImageId} style={{ objectFit: 'contain', width: '700px', borderRadius: '26px' }} />

      </Box>
    </div>
  )
}

export default ServiceBlock
