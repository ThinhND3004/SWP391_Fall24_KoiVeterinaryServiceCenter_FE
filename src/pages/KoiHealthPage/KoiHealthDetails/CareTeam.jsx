import { Box } from '@mui/material'
import React from 'react'

function CareTeam() {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: 'url("src/assets/images/KoiServices.png")',
          backgroundSize: 'contain', // Shrinks the image to fit within the box without cutting it off
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh'
          // padding: '20px',
        }}
      />

    </div>
  )
}

export default CareTeam
