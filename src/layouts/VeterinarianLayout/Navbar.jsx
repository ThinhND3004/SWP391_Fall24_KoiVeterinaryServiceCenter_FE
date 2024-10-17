import { Box, List, ListItem, ListItemText, Divider } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArticleIcon from '@mui/icons-material/Article'
import LoginIcon from '@mui/icons-material/Login'
import { ORANGE_COLOR } from '~/theme'
import { useState } from 'react'

const menus = [
  {
    title: 'Account',
    icon: AccountCircleIcon,
    url: '/veterinarian'
  },
  {
    title: 'Password',
    icon: LockIcon,
    url: '/veterinarian_password'
  },
  {
    title: 'Booking',
    icon: CalendarMonthIcon,
    url: '/veterinarian_booking'
  },
  {
    title: 'Report',
    icon: LocalHospitalIcon,
    url: '/veterinarian_medical_report'
  },
  {
    title: 'Medicine',
    icon: ArticleIcon,
    url: '/veterinarian_medicine'
  }
]

function Navbar() {
  const navigate = useNavigate() // dùng để điều hướng user
  const [selectedMenu, setSelectedMenu] = useState(null) // null vì chưa có menu nào được chọn
  // selectedMenu: chứa trạng thái hiện tại
  // setSelectedMenu: cập nhật giá trị mới của selectedMenu

  // Hàm handleMenuClick được gọi khi người dùng nhấp vào một mục menu
  // menu đại diện cho đối tượng menu mà người dùng đã nhấp vào, có thể chứa các url để điều hướng
  // idx là index của mục menu mà user click vào
  const handleMenuClick = (menu, idx) => {
    setSelectedMenu(idx) // cập nhật trạng thái selectedMenu với index của mục menu vừa đc chọn -> Giúp giao diện biết dc mục nào đang đc chọn
    navigate(menu.url) // điều hướng người dùng đến url của mục vừa nhấp
  }
  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'flex-start',
        position: 'fixed',
        width: '100%'
      }}
    >
      <List>
        {menus.map((menu, idx) => { // map lặp qua các mảng để tạo ra danh sách cho mỗi mục menu (title, menu, url)
          // menu là 1 phần nhỏ của menus
          // idx là index của từng phần tử trong mảng, bắt đầu từ 0 và tăng lên từ từ
          const IconComponent = menu.icon

          return (
            <Box
              key={`menu-${idx}`}
              sx={{ display: 'flex', alignItems: 'center', color: '#000' }}
            >
              <ListItem
                button
                onClick={() => handleMenuClick(menu, idx)}
                sx={{
                  gap: 1.5,
                  cursor: 'pointer',
                  mt: 2,
                  fontWeight: selectedMenu === idx ? 'bold' : 'normal'
                }}
              >
                <IconComponent />
                <ListItemText
                  primary={menu.title}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '18px',
                      color: '#000',
                      fontWeight: selectedMenu === idx ? 'bold' : 'normal'
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
  )
}

export default Navbar
