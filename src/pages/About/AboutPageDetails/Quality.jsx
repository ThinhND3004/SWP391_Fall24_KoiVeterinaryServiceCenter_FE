import { Box, Typography } from '@mui/material'
import koiAboutImg from '~/assets/images/KoiAboutPage.png'
import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'

function Quality() {
  return (
    <div>
      <Box sx={{ display: 'flex', height: '500px' }}>
        <Box sx={{ position: 'relative', background: `url(${koiAboutImg}) no-repeat 50% 50%`, width: '740px', height: '710px', top: '-130px' }} />
        <Box sx={{ width: '800px', position: 'relative', top: 100 }}>
          <Typography
            sx={{
              fontFamily: 'SVN-Konga Pro',
              fontSize: '45px',
              color: BLUE_COLOR,
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              textAlign: 'center'
            }}
          >
            Quality <span style={{ color: ORANGE_COLOR, marginLeft: '8px' }}>Koi Fish</span> Care
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 1.7, width: '700px', textAlign: 'center' }}>Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish. Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing. We are dedicated to helping koi enthusiasts maintain the health and well-being of their beloved fish.</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Quality
