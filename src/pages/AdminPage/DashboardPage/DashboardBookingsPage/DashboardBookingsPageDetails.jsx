import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { INPUT_FIELD_COLOR } from '~/theme'
import { BarChartPro } from '@mui/x-charts-pro/BarChartPro'
import { PieChart } from '@mui/x-charts/PieChart'
import ManagementApi from '~/api/ManagementApi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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

function DashboardPageDetails() {


  // //auth
  // useEffect(() => {
  //   const checkRole = ManagementApi.permitFor(["ADMIN"]);
  //   if (!checkRole)
  //   {
  //     // useNavigate("/home");
  //     navigate("/home");
  //   }
  // }, [])

  return (
    <div style={{ left: '250px', position: 'relative' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
          {/* {userInfo.firstName} {userInfo.lastName} */}
        </Typography>
        <Typography sx={{
          fontWeight: 600, fontSize: '20px'
        }}
        >
          Bookings Dashboard
        </Typography>
      </Breadcrumbs>


      <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{
              bgcolor: INPUT_FIELD_COLOR,
              width: '250px',
              height: '150px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                Total Working Time
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '32px' }}>
                380hrs
              </Typography>
            </Box>

            <Box sx={{
              bgcolor: INPUT_FIELD_COLOR,
              width: '250px',
              height: '150px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                Total Working Time
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '32px' }}>
                380hrs
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{
              bgcolor: INPUT_FIELD_COLOR,
              width: '250px',
              height: '150px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                Total Working Time
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '32px' }}>
                380hrs
              </Typography>
            </Box>

            <Box sx={{
              bgcolor: INPUT_FIELD_COLOR,
              width: '250px',
              height: '150px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
                Total Working Time
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '32px' }}>
                380hrs
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={600}
            height={300}
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


      {/* Lower section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
        <Box sx={{ bgcolor: INPUT_FIELD_COLOR, borderRadius: '20px', height: '320px', mt: 2 }}>
          <BarChartPro
            sx={{ mt: 3 }}
            width={600}
            height={300}
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

        <Box
          sx={{
            bgcolor: INPUT_FIELD_COLOR,
            borderRadius: '20px',
            height: '320px',
            mt: 2,
            width: '515px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mt: 3 }}>
            Service Rating
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' }
                ]
              }
            ]}
            width={400}
            height={200}
          />
        </Box>


      </Box>
    </div>
  )
}

export default DashboardPageDetails
