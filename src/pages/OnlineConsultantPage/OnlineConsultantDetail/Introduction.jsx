import React from "react";
import { Box, Typography } from "@mui/material";
import { BLUE_COLOR, ONLINE_BUTTON } from "~/theme";
import MeetingMethodTagHolder from "~/pages/ServicePage/ServicePageDetails/MethodMeetingTag";

function Introduction({ service, serviceAddress }) {

  const formatEstimatedTime = (timeString) => {
    if (!timeString) return "N/A";
  
    const [hours, minutes] = timeString.split(':').map(Number);
  
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    return "N/A"; // In case of 00:00:00
  };

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: "SVN-Konga Pro",
          fontSize: 120,
          textAlign: "center",
          color: BLUE_COLOR,
        }}
      >
        Our Medical Services
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
        <Box sx={{ width: "600px" }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "48px",
              color: BLUE_COLOR,
            }}
          >
            {service.name}
          </Typography>

          <MeetingMethodTagHolder
            meetingMethod={service.meetingMethod}
            serviceType={service.type}
          />

          <Typography
            sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2, mt: 4 }}
          >
            {service.overview}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Price:</Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {new Intl.NumberFormat("vi-VN", {
                  minimumFractionDigits: 0,
                }).format(service.price)}{" "}
                VND
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
          </Box>
        </Box>

        <Box
          component="img"
          src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
          sx={{
            objectFit: "contain",
            width: "600px",
            borderRadius: "26px",
            ml: 2, // margin left
          }}
        />
      </Box>
    </Box>
  );
}

export default Introduction;
