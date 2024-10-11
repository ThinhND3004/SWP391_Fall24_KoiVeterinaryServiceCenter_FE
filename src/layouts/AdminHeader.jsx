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
                src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/462711740_18005468618659508_2399165263118220467_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGgpYmZozIN8KHUTZoNLzjGU-vZdd6xRrVT69l13rFGtantx4zkHnpDZHBJOis87DDVjUIpZvcdv5zvbhPL48IS&_nc_ohc=uqKFgbi2lTEQ7kNvgEQtt6i&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=ABnDpDsis1fk5uA5uWyXpqV&oh=00_AYDLmxD5gdEYkVp0AOoNzOs0kQZ41mHFTEBBGrLbFeJKvQ&oe=670F28A5"
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
