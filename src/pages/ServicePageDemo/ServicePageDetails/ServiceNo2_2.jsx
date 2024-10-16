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

function ServiceNo2_2({ service }) {
  const navigate = useNavigate();

  const handleKoiTreatmentAtHomeDetails = () => {
    navigate("/koi-treatment-at-home", { state: { service } }); // Truyền state qua route
  };


  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "600px", borderRadius: "26px" }}>
        
          {/* Tên dịch vụ */}
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
                    textAlign: 'center',
                    backgroundColor: OFFLINE_CENTER_BUTTON,
                    color: 'white',
                    width: "350px",
                    borderRadius: '10px',
                    height: '30px' 
                }}
              >
                {service.meetingMethod}
              </Typography>

              <Typography
                sx={{
                    marginLeft: "30px",
                    textAlign: "center",
                    backgroundColor: OFFLINE_CENTER_BUTTON,
                    color: "white",
                    width: "100px",
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

          <Button
            variant="contained"
            color="primary"
            onClick={handleKoiTreatmentAtHomeDetails}
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

export default ServiceNo2_2;
