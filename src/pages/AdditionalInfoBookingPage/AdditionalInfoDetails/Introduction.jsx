// import { Typography } from '@mui/material'
import React from "react";
// import { BLUE_COLOR, ORANGE_COLOR } from '~/theme'
import { Box, Typography, Button } from "@mui/material";
import {
  BG_COLOR,
  BLUE_COLOR,
  GRAY_COLOR,
  OFFLINE_BUTTON,
  ONLINE_BUTTON,
  ORANGE_COLOR,
} from "~/theme";

function Introduction({ service, serviceAddress, veterinarian }) {

  const formatEstimatedTime = (timeString) => {
    if (!timeString) return "N/A";

    const [hours, minutes] = timeString.split(":").map(Number);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return "N/A"; // In case of 00:00:00
  };
  return (
    <Box>
      {/* <Typography sx={{ fontFamily: 'SVN-Konga Pro', fontSize: '45px', color: BLUE_COLOR, mb: 1 }}>Booking Information</Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ width: "600px", borderRadius: "26px", padding: 2 }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "45px",
              color: BLUE_COLOR,
              marginBottom: 2, // Margin bottom for spacing
            }}
          >
            {service.name}
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: ONLINE_BUTTON,
              color: "white",
              width: 150,
              borderRadius: "10px",
              height: "30px",
              marginBottom: 2, // Margin bottom for spacing
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {service.meetingMethod}
          </Typography>

          <Typography
            sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, marginTop: 2 }}
          >
            {service.overview}
          </Typography>

          {/* Displaying Price, Estimated Time, and Address using Box for better structure */}
          <Box sx={{ marginTop: 2, display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>Estimated Time:</Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {formatEstimatedTime(service.estimatedTime)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Address:
            </Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {serviceAddress || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Service Price:</Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {new Intl.NumberFormat("vi-VN", {
                  minimumFractionDigits: 0,
                }).format(service.price)}{" "}
                VND
              </Typography>
            </Box>
            {service.name !== "Pond Quality" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>Price/Koi:</Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                    {new Intl.NumberFormat("vi-VN", {
                      minimumFractionDigits: 0,
                    }).format(service.pricePerKoi)}{" "}
                    VND
                  </Typography>
                </Box>
              )}

            {service.name !== "Koi Treatment at home" &&
              service.name !== "Koi Treatment at center" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "SVN-Konga Pro",
                      fontSize: "48px",
                      color: BLUE_COLOR,
                    }}
                  >
                    Pond Size Price: 
                  </Typography>
                </Box>
              )}

            {service.name !== "Koi Treatment at home" &&
              service.name !== "Koi Treatment at center" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>Small Pond:</Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                    {new Intl.NumberFormat("vi-VN", {
                      minimumFractionDigits: 0,
                    }).format(service.smallPondPrice)}{" "}
                    VND
                  </Typography>
                </Box>
              )}
            {service.name !== "Koi Treatment at home" &&
              service.name !== "Koi Treatment at center" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    Medium Pond: 
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                    {new Intl.NumberFormat("vi-VN", {
                      minimumFractionDigits: 0,
                    }).format(service.mediumPondPrice)}{" "}
                    VND
                  </Typography>
                </Box>
              )}

            {service.name !== "Koi Treatment at home" &&
              service.name !== "Koi Treatment at center" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    Large Pond: :
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                    {new Intl.NumberFormat("vi-VN", {
                      minimumFractionDigits: 0,
                    }).format(service.largePondPrice)}{" "}
                    VND
                  </Typography>
                </Box>
              )}
          </Box>
        </Box>
        {/* </Box> */}

        <Box
          component="img"
          src={service.serImageId}
          sx={{
            objectFit: "contain",
            width: "500px",
            borderRadius: "26px",
            marginLeft: 2, // Margin left for spacing
            position: 'relative',
            top: '70px'
          }}
        />
      </Box>
    </Box>
  );
}

export default Introduction;
