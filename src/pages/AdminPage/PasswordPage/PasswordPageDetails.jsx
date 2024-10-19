import React from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import { Box, Breadcrumbs, TextField, Typography } from '@mui/material'
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme'
import { Link } from 'react-router-dom'


function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

function PasswordPageDetails() {
  return (
    <div style={{ left: '250px', position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          Admin
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          Password Management
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Enter your old password</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your old password'
            variant="outlined"
            sx={{
              width: '1100px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                borderColor: BLUE_COLOR,
                height: '60px',
                marginTop: '15px',
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR
                }
              },
              '& input': {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Enter your new password</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your new password'
            variant="outlined"
            sx={{
              width: '1100px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                borderColor: BLUE_COLOR,
                height: '60px',
                marginTop: '15px',
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR
                }
              },
              '& input': {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Comfirm your new password</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your new password'
            variant="outlined"
            sx={{
              width: '1100px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                borderColor: BLUE_COLOR,
                height: '60px',
                marginTop: '15px',
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR
                }
              },
              '& input': {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginBottom: '60px',
          marginTop: '50px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '200px',
            height: 'fit-content',
            backgroundColor: BLUE_COLOR,
            borderRadius: '40px',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Box
            sx={{
              width: 'calc(250px - 45px)',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Poppins'
            }}
          >
            Save changes
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default PasswordPageDetails
