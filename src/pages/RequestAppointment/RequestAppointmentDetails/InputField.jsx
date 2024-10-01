import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme'


function InputField() {
  return (
    <div>
      <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Service</Typography>
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
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>First name</Typography>
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
            </Box>
    </div>
  )
}

export default InputField
