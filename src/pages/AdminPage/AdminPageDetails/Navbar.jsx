import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import { ORANGE_COLOR } from '~/theme'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArticleIcon from '@mui/icons-material/Article'
import LoginIcon from '@mui/icons-material/Login'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from 'react-redux'


const pages = ['Account', 'Password', 'Customer', 'Booking', 'Veterian', 'Prescription']


function Navbar() {
  const navbarId = useSelector(state => state.globalConfig.navbarId)
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleNavClick = (id) => {
    switch (id) {
      case 0:
        navigate('/account')
        break
      case 1:
        navigate('/password')
        break
      case 2:
        navigate('/customer')
        break
      case 3:
        navigate('/booking')
        break
      case 4:
        navigate('/veterian')
        break
      default:
        navigate('/prescription')
    }
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000' }}>
            <AccountCircleIcon />
            <ListItem button component={Link} to="#" >
              <ListItemText
                primary="Account"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', paddingTop: '10px' }}>
            <LockIcon />
            <ListItem button component={Link} to="#" sx={{ color: '#000' }}>
              <ListItemText
                primary="Password"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', paddingTop: '10px' }}>
            <SupportAgentIcon />
            <ListItem button component={Link} to="#" sx={{ color: '#000' }}>
              <ListItemText
                primary="Customer"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', paddingTop: '10px' }}>
            <CalendarMonthIcon />
            <ListItem button component={Link} to="#" sx={{ color: '#000' }}>
              <ListItemText
                primary="Booking"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', paddingTop: '10px' }}>
            <LocalHospitalIcon />
            <ListItem button component={Link} to="#" sx={{ color: '#000' }}>
              <ListItemText
                primary="Veterian"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#000', paddingTop: '10px' }}>
            <ArticleIcon />
            <ListItem button component={Link} to="#" sx={{ color: '#000' }}>
              <ListItemText
                primary="Prescription"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: '#000',
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>

          <Divider sx={{ paddingTop: '50px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', color: ORANGE_COLOR, paddingTop: '10px' }}>
            <LoginIcon />
            <ListItem button component={Link} to="#" sx={{ color: ORANGE_COLOR, paddingTop: '10px' }}>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    color: ORANGE_COLOR,
                    fontWeight: 500
                  }
                }}
              />
            </ListItem>
          </Box>
        </List>

      </Box>

    </div >
  )
}

export default Navbar
