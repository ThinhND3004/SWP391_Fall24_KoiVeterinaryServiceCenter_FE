import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { INPUT_FIELD_COLOR } from '~/theme'
import { BarChartPro } from '@mui/x-charts-pro/BarChartPro'

const data = [
  {
    y1: 443.28,
    y2: 153.9
  },
  {
    y1: 110.5,
    y2: 217.8
  },
  {
    y1: 175.23,
    y2: 286.32
  },
  {
    y1: 195.97,
    y2: 325.12
  },
  {
    y1: 351.77,
    y2: 144.58
  },
  {
    y1: 43.253,
    y2: 146.51
  },
  {
    y1: 376.34,
    y2: 309.69
  },
  {
    y1: 31.514,
    y2: 236.38
  },
  {
    y1: 231.31,
    y2: 440.72
  },
  {
    y1: 108.04,
    y2: 20.29
  },
  {
    y1: 321.77,
    y2: 484.17
  },
  {
    y1: 120.18,
    y2: 54.962
  },
  {
    y1: 366.2,
    y2: 418.5
  },
  {
    y1: 451.45,
    y2: 181.32
  },
  {
    y1: 294.8,
    y2: 440.9
  },
  {
    y1: 121.83,
    y2: 273.52
  },
  {
    y1: 287.7,
    y2: 346.7
  },
  {
    y1: 134.06,
    y2: 74.528
  },
  {
    y1: 104.5,
    y2: 150.9
  },
  {
    y1: 413.07,
    y2: 26.483
  },
  {
    y1: 74.68,
    y2: 333.2
  },
  {
    y1: 360.6,
    y2: 422.0
  },
  {
    y1: 330.72,
    y2: 488.06
  }
]

const series = [
  {
    label: 'Series A',
    data: data.map((v) => v.y1)
  },
  {
    label: 'Series B',
    data: data.map((v) => v.y2)
  }
]

function DashboardVeterinarianDetails() {
  return (
    <div style={{ position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {/* {userInfo.firstName} {userInfo.lastName} */}
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Veterinarians Dashboard
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '500px', height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Total Working Time
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
            320hrs
          </Typography>
        </Box>

        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '500px', height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
            Average Working Time
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
            8hrs
          </Typography>
        </Box>
      </Box>

      {/* <Box sx={{ bgcolor: INPUT_FIELD_COLOR, width: '1020px', mt: 2, height: '200px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          Average Working Time
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '40px' }}>
          8hrs
        </Typography>
      </Box> */}

      {/* Chart */}
      <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2, width: '500px' }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={500}
            height={320}
            xAxis={[
              {
                scaleType: 'band',
                data: data.map((v, i) => i),
                zoom: true
              }
            ]}
            series={series}
          />
        </Box>

        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2, width: '500px' }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={500}
            height={320}
            xAxis={[
              {
                scaleType: 'band',
                data: data.map((v, i) => i),
                zoom: true
              }
            ]}
            series={series}
          />
        </Box>
      </Box>
    </div>
  )
}

export default DashboardVeterinarianDetails
