import React from 'react'
import Button from '@mui/material/Button'
import { Box, TextField, Typography } from '@mui/material'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}


function Profile() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          Nguyen Van A
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Account
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <img
          src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/462254484_1075104570840409_1720952893450055569_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBDw4RgEsvpNbYjcISu1i-NyLFAtlmEDY3IsUC2WYQNsSPnRUqTF1rGaAXgHitmqP4APbrVRbnBdYMfUAhFBj-&_nc_ohc=v3kjlMgghMQQ7kNvgHfPoeQ&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=AWZg7-R8bHWFKC0HOW-berR&oh=00_AYA-k4UZjqk6z8BAP38BCWqLMPUhWfyrgt9OA-joHMvMlg&oe=670C1D26"
          style={{ width: '90px', height: '90px', borderRadius: '50%', marginRight: '20px' }}
        />
        <Box>
          <Box sx={{ display: 'flex', width: '400px', height: '30px', gap: 2 }}>
            <Button variant="contained" sx={{ boxShadow: 'none', fontSize: '16px', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', height: '40px' }}>
              Upload new picture
            </Button>

            <Button variant="contained" sx={{ boxShadow: 'none', color: ORANGE_COLOR, fontSize: '16px', bgcolor: INPUT_FIELD_COLOR, borderRadius: '10px', height: '40px' }}>
              Delete picture
            </Button>
          </Box>

        </Box>
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-around', gap: 10 }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Profile name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
            sx={{
              width: '500px',
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
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Email</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
            sx={{
              width: '500px',
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
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>First name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your first name'
            variant="outlined"
            sx={{
              width: '500px',
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
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Last name</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your last name'
            variant="outlined"
            sx={{
              width: '500px',
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
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Phone number</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your phone number'
            variant="outlined"
            sx={{
              width: '500px',
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

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Date of Birth</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              variant='outlined'
              sx={{
                overflow: 'hidden',
                width: '500px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  borderColor: BLUE_COLOR,
                  height: '60px',
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
              }}>
              <DatePicker
                placeholder="Select your date"
                label=''
                sx={{
                  backgroundColor: INPUT_FIELD_COLOR,
                  width: '600px',
                  borderRadius: '15px'
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>

      <Box sx={{ mt: 5, mb: '80px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Address</Typography>
        <TextField
          id="outlined-basic"
          placeholder='Enter your address'
          variant="outlined"
          type='text'
          sx={{
            width: '1090px',
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

      {/* Submit button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          marginBottom: '60px'
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

export default Profile
