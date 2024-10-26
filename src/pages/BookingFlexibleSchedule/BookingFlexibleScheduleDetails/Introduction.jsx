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

function Introduction({ service }) {
  return (
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
            borderRadius: "14px",
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
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Price:
            </Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              ${service.price}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Estimated Time:
            </Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {service.estimatedTime || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Address:
            </Typography>
            <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
              {service.address || "N/A"}
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
          marginLeft: 2, // Margin left for spacing
        }}
      />
    </Box>
  );
}

export default Introduction;
