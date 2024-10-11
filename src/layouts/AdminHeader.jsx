import { AppBar, Box, Typography } from '@mui/material'
import React from 'react'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Container from '@mui/material/Container'


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25)
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto'
//   }
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }))

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch'
//       }
//     }
//   }
// }))

function Header() {
  return (
    <div>
      <AppBar position="static" color='transparent' sx={{ minHeight: '85px' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', color: ORANGE_COLOR, fontSize: 32, textAlign: 'center' }}>
              Koi Care Clinic
            </Typography>
            <Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: '14x', fontWeight: '500', color: BLUE_COLOR }}>Hi, Duong</Typography>
              <img
                src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/462254484_1075104570840409_1720952893450055569_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBDw4RgEsvpNbYjcISu1i-NyLFAtlmEDY3IsUC2WYQNsSPnRUqTF1rGaAXgHitmqP4APbrVRbnBdYMfUAhFBj-&_nc_ohc=v3kjlMgghMQQ7kNvgHfPoeQ&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=AWZg7-R8bHWFKC0HOW-berR&oh=00_AYA-k4UZjqk6z8BAP38BCWqLMPUhWfyrgt9OA-joHMvMlg&oe=670C1D26"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            </Box>
          </Box>
        </Container>
      </AppBar>
    </div >
  )
}

export default Header
