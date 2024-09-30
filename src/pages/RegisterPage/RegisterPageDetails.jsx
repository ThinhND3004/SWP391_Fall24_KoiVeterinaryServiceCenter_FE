import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate } from 'react-router-dom'


function RegisterPageDetails() {
  const navigate = useNavigate()

  return (
    <div>
      <Box sx={{ margin: 0, padding: 0 }}>
        <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 64, textAlign: 'left', color: BLUE_COLOR }}>
          Registration
        </Typography>
        <Typography sx={{ fontSize: 15, textAlign: 'left', color: BLUE_COLOR }}>
          Enter your details below to create your account and get started
        </Typography>
        <Box>

          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>First name</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your first name'
                variant="outlined"
                sx={{
                  width: '600px',
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
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Last name</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your last name'
                variant="outlined"
                sx={{
                  width: '600px',
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
          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Email</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your email'
                variant="outlined"
                sx={{
                  width: '600px',
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

              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Date of Birth</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} variant='outlined'
                  sx={{
                    overflow: 'hidden',
                    width: '600px',
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
                    }} />
                </DemoContainer>
              </LocalizationProvider>

            </Box>
          </Box>

          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Phone number</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your phone number'
                variant="outlined"
                sx={{
                  width: '600px',
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
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Address</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your address'
                variant="outlined"
                sx={{
                  width: '600px',
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

          <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Password</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your password'
                variant="outlined"
                sx={{
                  width: '600px',
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
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Confirm Password</Typography>
              <TextField
                id="outlined-basic"
                placeholder='Enter your password'
                variant="outlined"
                sx={{
                  width: '600px',
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '80px',
                marginBottom: '60px',
                borderRadius: '15px',
                border: `1px solid ${BLUE_COLOR}`
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '600px',
                  height: 'fit-content',
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    height: '60px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BLUE_COLOR,
                    fontFamily: 'Poppins',
                    textAlign: 'center'
                  }}
                >
                  Cancel
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '80px',
                marginBottom: '60px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '600px',
                  height: 'fit-content',
                  backgroundColor: BLUE_COLOR,
                  borderRadius: '15px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    height: '60px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    textAlign: 'center'
                  }}
                >
                  Create account
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', marginBottom: '40px' }}>
            <Typography sx={{ fontWeight: '500', fontSize: 20 }}>Already have an account?</Typography>

            <Typography onClick={() => navigate('/login')} component={'a'} sx={{
              color: ORANGE_COLOR,
              fontWeight: 600,
              fontSize: 20,
              cursor: 'pointer',
              p: 0,
              m: 0
            }}>
              Login
            </Typography>
          </Box>


        </Box>
      </Box>
    </div >
  )
}

export default RegisterPageDetails
