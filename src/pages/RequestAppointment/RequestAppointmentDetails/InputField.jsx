import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR } from '~/theme'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function InputField() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Service</Typography>
          <Button sx={{
            color: GRAY_COLOR,
            bgcolor: INPUT_FIELD_COLOR,
            width: '600px',
            height: '60px',
            marginTop: '15px',
            borderRadius: '15px',
            border: `1px solid ${GRAY_COLOR}`,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 16,
            fontWeight: 400
          }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >

            Select your service
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClose} sx={{ width: '600px' }}>Koi Care</MenuItem>
            <MenuItem onClick={handleClose}>Veterinary</MenuItem>
            <MenuItem onClick={handleClose}>Vaccination</MenuItem>
            <MenuItem onClick={handleClose}>Cleaning</MenuItem>
          </Menu>

        </Box>

        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Doctor</Typography>
          <Button sx={{
            color: GRAY_COLOR,
            bgcolor: INPUT_FIELD_COLOR,
            width: '600px',
            height: '60px',
            marginTop: '15px',
            borderRadius: '15px',
            border: `1px solid ${GRAY_COLOR}`,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 16,
            fontWeight: 400
          }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >

            Select your doctor
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={handleClose} sx={{ width: '600px' }}>Koi Care</MenuItem>
            <MenuItem onClick={handleClose}>Veterinary</MenuItem>
            <MenuItem onClick={handleClose}>Vaccination</MenuItem>
            <MenuItem onClick={handleClose}>Cleaning</MenuItem>
          </Menu>

        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Date of Birth</Typography>
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

        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Slot</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{
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
              <TimePicker sx={{
                backgroundColor: INPUT_FIELD_COLOR,
                width: '600px',
                borderRadius: '15px'
              }} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>


      <Box sx={{ display: 'block', marginTop: '40px', marginBottom: '60px' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Address</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your address'
            variant="outlined"
            multiline
            maxRows={4}
            rows={3}
            sx={{
              maxWidth: '100%',
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                borderColor: BLUE_COLOR,
                marginTop: '15px',
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR
                }
              },
              '& textarea': {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: '20px 15px',
                fontSize: '16px',
                borderRadius: '15px'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'block', marginTop: '40px', marginBottom: '60px' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Describe Your Fish Issue</Typography>
          <TextField
            id="outlined-basic"
            placeholder='Enter your message'
            variant="outlined"
            multiline
            maxRows={4}
            rows={8}
            sx={{
              maxWidth: '100%',
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                borderColor: BLUE_COLOR,
                marginTop: '15px',
                '&.Mui-focused fieldset': {
                  borderColor: BLUE_COLOR
                }
              },
              '& textarea': {
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
          marginTop: '40px',
          marginBottom: '60px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '250px',
            height: 'fit-content',
            backgroundColor: BLUE_COLOR,
            borderRadius: '40px',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {/* Text on the left */}
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
            Just Send
          </Box>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: 'rotate(-45deg)', transitionDuration: '1.5s', color: '#fff', marginRight: '40px' }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Box>
      </Box>
    </div>
  )
}

export default InputField
