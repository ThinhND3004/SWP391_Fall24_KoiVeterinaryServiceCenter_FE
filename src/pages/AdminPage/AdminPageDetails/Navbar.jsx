import { Box, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import { ORANGE_COLOR } from '~/theme'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LoginIcon from '@mui/icons-material/Login'
import Divider from '@mui/material/Divider'
import SetMealIcon from '@mui/icons-material/SetMeal'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DashboardIcon from '@mui/icons-material/Dashboard'


const menus = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    url: '/dashboard'
  },
  {
    title: 'Account',
    icon: AccountCircleIcon,
    url: '/profile'
  },
  // {
  //   title: 'Password',
  //   icon: LockIcon,
  //   url: '/admin_password'
  // },
  {
    title: 'Staff',
    icon: SupportAgentIcon,
    url: '/admin_staff'
  },
  {
    title: 'Veterian',
    icon: LocalHospitalIcon,
    url: '/admin_veterinarian_management'
  },
  {
    title: 'Service',
    icon: CalendarMonthIcon,
    url: '/admin_service'
  },
  {
    title: 'Koi Species',
    icon: SetMealIcon,
    url: '/admin_koi_species'
  },
  {
    title: 'Medicine',
    icon: VaccinesIcon,
    url: '/admin_medicine'
  },
  {
    title: 'Delivery',
    icon: LocalShippingIcon,
    url: '/admin_delivery'
  }
]

function Navbar() {
  const navigate = useNavigate()
  const [selectedMenu, setSelectedMenu] = useState(null)

  const handleMenuClick = (menu, idx) => {
    setSelectedMenu(idx)
    navigate(menu.url)
  }

  return (
    <div>
      <Box
        sx={{
          // padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'flex-start',
          position: 'fixed',
          width: '100%'
        }}
      >
        <List>
          {menus.map((menu, idx) => {
            const IconComponent = menu.icon

            return (
              <Box
                key={`menu-${idx}`}
                sx={{ display: 'flex', alignItems: 'center', color: '#000' }}>
                <ListItem
                  button
                  onClick={() => handleMenuClick(menu, idx)}
                  sx={{
                    gap: 1.5,
                    cursor: 'pointer',
                    mt: 2,
                    fontWeight: selectedMenu === idx ? 'bold' : 'normal',
                    color: selectedMenu === idx ? 'bold' : 'normal'
                  }}
                >
                  <IconComponent />
                  <ListItemText
                    primary={menu.title}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '18px',
                        // Apply bold style for the text of the selected item
                        fontWeight: selectedMenu === idx ? 'bold' : 'normal',
                        color: selectedMenu === idx ? 'bold' : 'normal'
                      }
                    }}
                  />
                </ListItem>
              </Box>
            )
          })}

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
    </div>
  )
}

export default Navbar
