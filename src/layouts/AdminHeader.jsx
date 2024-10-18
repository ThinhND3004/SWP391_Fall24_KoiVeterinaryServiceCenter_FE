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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, height: '80px' }}>
            <Typography sx={{ fontFamily: 'SVN-Konga Pro', color: ORANGE_COLOR, fontSize: 32, textAlign: 'center', position: 'fixed', height: '30px' }}>
              Koi Care Clinic
            </Typography>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, left: '1300px', position: 'fixed', top: '10px' }}>
            <Typography sx={{ fontSize: '14x', fontWeight: '500', color: BLUE_COLOR }}>Hi, Tai</Typography>
            <img
              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/461863234_18004172858659508_370807975937824020_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG4Cq0YzRcYU_BixudzfnpZVI7LFGm_uQZUjssUab-5BrVSZNO0SpZ8R1gWGIAYzCaFEhJ2jR732n-Lz77RM_wU&_nc_ohc=c_XBQOlF1qAQ7kNvgFl9-1P&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=AgjrpjG-5zj6JAsMIV1QjVU&oh=00_AYBRM2UFynQM54Sln6dqs21OL_h5LZXxXthNkzrvjpm0qw&oe=670F26AA"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          </Box> */}
          </Box>
        </Container>
      </AppBar>
    </div >
  )
}

export default Header
