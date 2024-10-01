import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GradeIcon from '@mui/icons-material/Grade'
import Carousel from 'react-bootstrap/Carousel'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Import required modules
import { Pagination } from 'swiper/modules'

function Customer() {
  const feedbacks = [
    {
      text: 'I had a fantastic experience at Koi Care Clinic! The staff was friendly and knowledgeable, and they explained every step of my koi’s treatment clearly. The follow-up care really showed how much they care about their clients. My only suggestion would be to offer weekend appointments for added convenience. Highly recommend this clinic for any koi care!',
      name: 'Sarah Thompson',
      role: 'Marketing Manager',
      rating: 5.0,
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewpersonaltraining-697509.jpg&fm=jpg'
    },
    {
      text: 'The team at Koi Care Clinic is top-notch! They treated my koi with care and expertise. Highly recommend their services.',
      name: 'John Doe',
      role: 'Aquatic Specialist',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      text: 'Great clinic and very professional team. My koi recovered quickly, and I couldn’t be happier with the service provided.',
      name: 'Emily Johnson',
      role: 'Biologist',
      rating: 5.0,
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
  ]
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <div>
      <Box sx={{ bgcolor: '#D3EFED', padding: '50px 0px 50px 0px', borderRadius: '14px', marginBottom: '40px' }}>
        <Typography
          sx={{
            fontFamily: 'SVN-Konga Pro',
            fontSize: '48px',
            color: BLUE_COLOR,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          What <span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}> Customer Says</span>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            src="src\assets\images\wavy.png"
            alt="Wavy Image"
            sx={{
              width: '40%'
            }}
          />
        </Box>

        {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <img src='src\assets\images\OrangeLine.png' style={{ width: '5px', height: '320px' }} />
          <Box sx={{ width: '600px', borderRadius: '26px', padding: '0px 50px' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
                I had a fantastic experience at Koi Care Clinic! The staff was friendly and knowledgeable, and they explained every step of my koi’s treatment clearly. The follow-up care really showed how much they care about their clients. My only suggestion would be to offer weekend appointments for added convenience. Highly recommend this clinic for any koi care!
              </Typography>
              <Box sx={{ display: 'flex', gap: 5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Sarah Thompson</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GradeIcon sx={{ color: '#F3A230', fontSize: 24 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 24 }}>5.0</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontWeight: 400, fontSize: 16 }}>Marketing Manager</Typography>


              <Box sx={{ display: 'flex', gap: 2, margin: '20px 0px 20px 0px', color: BLUE_COLOR }}>
                <ArrowBackIcon />
                <ArrowForwardIcon />
              </Box>
            </Box>
          </Box>
          <Box>
            <img
              src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewpersonaltraining-697509.jpg&fm=jpg"
              style={{
                objectFit: 'cover',
                width: '300px',
                height: '300px',
                borderRadius: '26px'
              }}
            />
          </Box>
        </Box> */}

        {/* Carousel */}
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{ width: '90%', maxWidth: 'auto' }} // Adjust the width as needed
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <img src='src/assets/images/OrangeLine.png' style={{ width: '5px', height: '250px' }} alt="Line" />
                <Box sx={{ width: '600px', borderRadius: '26px', padding: '0px 50px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
                      {feedback.text}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{feedback.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GradeIcon sx={{ color: '#F3A230', fontSize: 24 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: 24 }}>{feedback.rating}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontWeight: 400, fontSize: 16 }}>{feedback.role}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, margin: '20px 0px', color: '#007BFF' }}>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    style={{
                      objectFit: 'cover',
                      width: '300px',
                      height: '300px',
                      borderRadius: '26px'
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>


      </Box>
    </div >
  )
}

export default Customer
