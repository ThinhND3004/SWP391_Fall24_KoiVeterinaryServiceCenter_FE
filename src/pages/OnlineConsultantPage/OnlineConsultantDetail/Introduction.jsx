import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { BLUE_COLOR, ONLINE_BUTTON } from "~/theme";
import MeetingMethodTagHolder from "~/pages/ServicePage/ServicePageDetails/MethodMeetingTag";

function Introduction({ service, serviceAddress }) {
  const formatEstimatedTime = (timeString) => {
    if (!timeString) return "N/A";

    // Tách giờ và phút từ chuỗi timeString
    const [hours, minutes] = timeString.split(":").map(Number);

    // Trừ đi 1 giờ nếu giờ lớn hơn 0
    const adjustedHours = hours > 0 ? hours : 0; // Trừ đi 1 giờ nếu có giờ

    let timeReturn = '';
    if (adjustedHours > 0) {
      timeReturn += `${adjustedHours} hour${adjustedHours > 1 ? "s" : ""} `;
    } 
     if (minutes > 0) {
      timeReturn += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return timeReturn ? timeReturn : 'N/A'; // Trường hợp không có giờ và phút (00:00:00)
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

          <Box
            sx={{ marginTop: 2, display: "flex", alignItems: "center", mb: 1 }}
          >
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
                    VND (Less than 5m3)
                  </Typography>
                </Box>
              )}
            {service.name !== "Koi Treatment at home" &&
              service.name !== "Koi Treatment at center" &&
              service.name !== "Online Consultant" && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>Medium Pond:</Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                    {new Intl.NumberFormat("vi-VN", {
                      minimumFractionDigits: 0,
                    }).format(service.mediumPondPrice)}{" "}
                    VND (5m3 - 15m3)
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
                    VND (More than 15m3)
                  </Typography>
                </Box>
              )}

            {service.meetingMethod === "OFFLINE_HOME" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  marginTop: "20px",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>* Note: </Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                  This service is only available for locations within 30 km or
                  less.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          component="img"
          src={service.serImageId}
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
