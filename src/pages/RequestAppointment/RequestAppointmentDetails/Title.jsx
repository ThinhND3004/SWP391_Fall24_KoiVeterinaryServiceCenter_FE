import { Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR } from '~/theme'

function Title() {
  return (
    <div>
        <Box sx={{ margin: 0, padding: 0}}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: 50, textAlign: 'left', color: BLUE_COLOR }}>Request Appointment</Typography>
        <Typography sx={{ fontSize: 14, textAlign: 'left', color: BLUE_COLOR }}>If you have a pressing concern, please call our office directly at (831) 278-1081.
        <br/>Our phones and emails are answered 9am-3pm PST Monday through Saturday, but are closed most major holidays.
<br/>For clients in Santa Barbara, Ventura and Los Angeles counties, please fill out this form. We partner with the Aquatic Pet Vet to see clients in that service area.</Typography>
        </Box>
    </div>
  )
}

export default Title
