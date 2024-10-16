// import React from 'react'
// import { Box, Typography } from '@mui/material'
// import { BG_COLOR, BLUE_COLOR, GRAY_COLOR, OFFLINE_CENTER_BUTTON, ONLINE_BUTTON, ORANGE_COLOR } from '~/theme'
// import { Button } from 'react-bootstrap'
// import CallMadeIcon from '@mui/icons-material/CallMade';

// function ServiceNo1() {
//   return (
//     <div>
//       <Box sx={{ display: 'flex'}}>
//         <Box sx={{ width: '600px', borderRadius: '26px' }}>
//           <Typography
//             sx={{
//               fontFamily: 'SVN-Konga Pro',
//               fontSize: '45px',
//               color: BLUE_COLOR,
//               display: 'flex',
//               justifyContent: 'start'
//             }}
//           >
//             Online Consultant
//           </Typography>
//           <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: '20px' }}>Koi Care Clinic is a unique facility that specializes in providing comprehensive care for koi fish.<br /> Our team of experienced professionals offers a wide range of services, including routine check-ups, disease diagnosis and treatment, pond maintenance, and water quality testing.</Typography>
//           <Box padding={'20px 0px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={500} height={50}>
//             <Box padding={'10px 0px'} display={'flex'} justifyContent={'space-between'} width={230}>
//               <Typography 
//                 sx={{
//                   textAlign: 'center',
//                   backgroundColor: ONLINE_BUTTON,
//                   color: 'white',
//                   width: 100,
//                   borderRadius: '10px',
//                   height: '30px' 
//                 }}
//               >Online</Typography>
//               <Typography
//                 sx={{
//                   textAlign: 'center',
//                   backgroundColor: OFFLINE_CENTER_BUTTON,
//                   color: 'white',
//                   width: 100,
//                   borderRadius: '10px',
//                   height: '30px'  
//                 }}
//               >All</Typography>
//             </Box>
//             <Button
//               style={{
//                 height: '50px',
//                 width: '150px',
//                 borderRadius: '30px',
//                 backgroundColor: BLUE_COLOR,
//                 color: 'white',
//                 textAlign: 'center',
//                 display: 'flex',
//                 justifyContent: 'center', // Centers content horizontally
//                 alignItems: 'center',   
//                 justifyContent: 'space-between',
//                 padding: '0px 9px'  // Smooth background color transition
//               }}
//             >Learn more
//             <CallMadeIcon/>
//             </Button>
//           </Box>
//         </Box>
//         <img src="src\assets\images\multiColor.avif" style={{ objectFit: 'contain', width: '500px', borderRadius: '26px' }} />

//       </Box>
//     </div>
//   )
// }

// export default ServiceNo1

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  BG_COLOR,
  BLUE_COLOR,
  GRAY_COLOR,
  OFFLINE_CENTER_BUTTON,
  ONLINE_BUTTON,
  ORANGE_COLOR,
} from "~/theme";
import { useNavigate } from "react-router-dom";

function ServiceNo1({ service }) {
  const navigate = useNavigate();

  const handleOnlineConsultantDetails = () => {
    navigate("/online-consultant", { state: { service } }); // Truyền state qua route
  };

  return (
    <div>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "600px", borderRadius: "26px" }}>

          {/* Service Name */}
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "45px",
              color: BLUE_COLOR,
              display: "flex",
              justifyContent: "start",
            }}
          >
            {service.name}
          </Typography>

          <Box
            padding={"20px 0px"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={500}
            height={50}
          >
            <Box
              padding={"10px 0px"}
              display={"flex"}
              justifyContent={"space-between"}
              width={230}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  backgroundColor: ONLINE_BUTTON,
                  color: "white",
                  width: 100,
                  borderRadius: "10px",
                  height: "30px",
                }}
              >
                {service.meetingMethod}
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  backgroundColor: OFFLINE_CENTER_BUTTON,
                  color: "white",
                  width: 100,
                  borderRadius: "10px",
                  height: "30px",
                }}
              >
                {service.type}
              </Typography>
            </Box>
          </Box>

          {/* Mô tả dịch vụ */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 2,
              marginTop: "20px",
            }}
          >
            {service.overview}
          </Typography>
          {/* </Box> */}

          <Button
            variant="contained"
            color="primary"
            onClick={handleOnlineConsultantDetails}
            sx={{
              marginTop: "20px",
              backgroundColor: BLUE_COLOR,
              color: "white",
            }}
          >
            Learn more
          </Button>
        </Box>

        <img
          src="src\assets\images\multiColor.avif"
          style={{ objectFit: "contain", width: "500px", borderRadius: "26px" }}
        />
      </Box>
    </div>
  );
}

export default ServiceNo1;

