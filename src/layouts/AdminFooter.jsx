import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR } from '~/theme'
import CopyrightIcon from '@mui/icons-material/Copyright'


function AdminFooter() {
  return (
    <div>

      {/* <Divider style={{
        borderWidth: '1px',
        opacity: '100%',
        color: BLUE_COLOR
      }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CopyrightIcon fontSize="sx" sx={{ color: BLUE_COLOR }} />
        <Typography sx={{
          fontWeight: '300',
          fontSize: '12px',
          padding: '20px 3px',
          color: BLUE_COLOR
        }}>
          Copyright Rimel 2022. All right reserved
        </Typography>
      </Box> */}
    </div>
  )
}

export default AdminFooter
