import React from 'react'
import Navbar from '../AdminPageDetails/Navbar'
import CustomerPageDetails from '~/pages/AdminPage/CustomerPage/CustomerPageDetails'
import { Box } from '@mui/material'

function CustomerPage() {
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'} gap={'50px'} px={'30px'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Navbar />
          <CustomerPageDetails />
        </Box>
      </Box>
    </div >
  )
}

export default CustomerPage
