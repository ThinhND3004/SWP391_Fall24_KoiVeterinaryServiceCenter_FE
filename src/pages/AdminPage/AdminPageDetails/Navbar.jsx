import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArticleIcon from '@mui/icons-material/Article'
import LoginIcon from '@mui/icons-material/Login'
import Divider from '@mui/material/Divider'

function Navbar() {
  return (
    <div>
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'flex-start'
        }}
      >
        <List>
          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR }}>
            <AccountCircleIcon />
            <ListItem button component={Link} to="#" >
              <ListItemText primary="Account" />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR, paddingTop: '10px' }}>
            <LockIcon />
            <ListItem button component={Link} to="#" sx={{ color: BLUE_COLOR }}>
              <ListItemText primary="Password" />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR, paddingTop: '10px' }}>
            <SupportAgentIcon />
            <ListItem button component={Link} to="#" sx={{ color: BLUE_COLOR }}>
              <ListItemText primary="Customer" />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR, paddingTop: '10px' }}>
            <CalendarMonthIcon />
            <ListItem button component={Link} to="#" sx={{ color: BLUE_COLOR }}>
              <ListItemText primary="Booking" />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR, paddingTop: '10px' }}>
            <LocalHospitalIcon />
            <ListItem button component={Link} to="#" sx={{ color: BLUE_COLOR }}>
              <ListItemText primary="Veterian" />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: BLUE_COLOR, paddingTop: '10px' }}>
            <ArticleIcon />
            <ListItem button component={Link} to="#" sx={{ color: BLUE_COLOR }}>
              <ListItemText primary="Prescription" />
            </ListItem>
          </Box>

          <Divider sx={{ paddingTop: '50px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', color: ORANGE_COLOR, paddingTop: '10px' }}>
            <LoginIcon />
            <ListItem button component={Link} to="#" sx={{ color: ORANGE_COLOR, paddingTop: '10px' }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </Box>
        </List>

      </Box>

    </div >
  )
}

export default Navbar
