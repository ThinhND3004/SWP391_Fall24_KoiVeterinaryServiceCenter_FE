import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { setNavbarId } from '~/redux/globalConfigSlice'
import { GRAY_COLOR, ORANGE_COLOR, BLUE_COLOR } from '~/theme'
import { Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '~/config/axios'
import Avatar from '@mui/material/Avatar';



const pages = ['Home', 'About us', 'Service', 'Koi Health', 'Contact Us']
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Header() {
  // lay state tu redux (currentState)
  // Dat state la navbarId
  const navbarId = useSelector(state => state.globalConfig.navbarId)

  // doc mess
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const navigate = useNavigate()

  const [accInfo, setAccInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [token, setToken] = useState(localStorage.getItem('token'))

  const handleGetAccInfo = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {

        console.log("TOKEN: ", token)
        const response = await api.get(`accounts/current`);

        console.log("INFO: ", response.data.data);

        if (response) {
          setAccInfo(response.data.data);
          localStorage.setItem('accountInfo', JSON.stringify(response.data.data));
        }
      } catch {
        console.log("ERROR GET INFO");
      }
    }
  }

  useEffect(() => {
    handleGetAccInfo();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("accountInfo");
    localStorage.removeItem("token");
    // navigate("/home");
    window.location.href = "/home";
  };

  // Handle profile
  const handleProfile = () => {
    handleClose();
    console.log('Go to profile...');
    // Add your profile navigation logic here
  };


  // d biet
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
        navigate('/home')
        break
      case 1:
        navigate('/about')
        break
      case 2:
        navigate('/service')
        break
      case 3:
        navigate('/koihealth')
        break
      case 4:
        navigate('/contact')
        break
      default:
        navigate('/home')
    }
  }

  return (
    <AppBar position="static" color='transparent' sx={{ minHeight: '85px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'SVN-Konga Pro',
              fontWeight: 700,
              fontSize: 32,
              color: ORANGE_COLOR,
              textDecoration: 'none'
            }}
          >
            Koi Care Clinic
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Responsive */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'SVN-Konga Pro',
              fontWeight: 700,
              color: ORANGE_COLOR,
              fontSize: 32,
              textDecoration: 'none'
            }}
          >
            Koi Care Clinic
          </Typography>
          <Box sx={{
            flexGrow: 1,
            display: {
              xs: 'none',
              md: 'flex'
            },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5
          }}>
            {pages.map((page, idx) => (
              <Button
                disableRipple
                key={page}
                onClick={() => {
                  handleNavClick(idx)
                  dispatch(setNavbarId(idx))
                }}
                sx={{
                  py: '20px',
                  color: navbarId === idx ? BLUE_COLOR : GRAY_COLOR,
                  borderBottom: navbarId === idx ? `3px ${ORANGE_COLOR} solid` : '',
                  display: 'block',
                  fontWeight: 600,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* login button */}

          {!accInfo && <Box minWidth={300} display={'flex'} justifyContent={'center'}>
            <Button variant="outlined" onClick={() => navigate('/login')} sx={{
              border: `1px ${BLUE_COLOR} solid`,
              borderRadius: '30px',
              color: BLUE_COLOR,
              fontWeight: 600,
              p: '10px 38px',
              boxShadow: '0px 3px 1px rgba(0, 0, 0, 0.2)'
            }}>
              Login
            </Button>
          </Box>
          }

          {accInfo &&
            <>
              <Typography
                sx={{
                  py: '20px',
                  color: GRAY_COLOR,
                  display: 'block',
                  fontWeight: 600,
                }}
              >Hi, {accInfo.firstName} {accInfo.lastName}
              
              </Typography>
              <IconButton onClick={handleMenuClick} color="inherit">
                <Avatar alt='hello' src='src\assets\images\avtDemo.jpg' />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>

          }





        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  )
}
export default Header
