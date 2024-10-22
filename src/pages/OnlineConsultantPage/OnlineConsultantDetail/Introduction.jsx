import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BLUE_COLOR,
  ONLINE_BUTTON,
} from "~/theme";
import MeetingMethodTagHolder from "~/pages/ServicePage/ServicePageDetails/MethodMeetingTag";

function Introduction({ service }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ width: "600px", borderRadius: "26px", padding: 2 }}>
          <Typography
            sx={{
              fontFamily: "SVN-Konga Pro",
              fontSize: "45px",
              color: BLUE_COLOR,
              mb: 2, // margin bottom
            }}
          >
            {service.name}
          </Typography>

          <MeetingMethodTagHolder meetingMethod={service.meetingMethod} serviceType={service.type} />

          <Typography sx={{ fontWeight: 400, fontSize: 16, lineHeight: 2 }}>
            {service.overview}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Price:
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                ${service.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Estimated Time:
              </Typography>
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {service.estimatedTime || "N/A"}
              </Typography>
            </Box>

          </Box>
        </Box>

        <Box
          component="img"
          src="https://cdn.shopify.com/s/files/1/1083/2612/files/koi2_480x480.jpg?v=1719301650"
          sx={{
            objectFit: "contain",
            width: "500px",
            borderRadius: "26px",
            ml: 2, // margin left
          }}
        />
      </Box>
    </Box>
  );
}

export default Introduction;
