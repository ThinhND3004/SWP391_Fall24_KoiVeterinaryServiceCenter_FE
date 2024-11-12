import React from 'react'
import Title from './Title'
import { Box } from '@mui/material'

function LoginPageAdmin() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // makes the box take the full viewport height
    >
      <Title />
    </Box>
  );
}

export default LoginPageAdmin
