import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'

function Introduction() {
  return (
    <div>
      <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 120, textAlign: 'center', color: BLUE_COLOR }}>Choose Consultant</Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ textAlign: 'center', fontSize: 14, marginTop: '10px', width: '900px' }}>
          Selecting the right veterinarian is essential for your pet's health and happiness. At Koi Care Clinic, our skilled veterinary team is dedicated to providing expert, compassionate care tailored to every animal’s needs.
        </Typography>
      </Box>
    </div>
  )
}

export default Introduction
