import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import CustomerPasswordDetails from "./CustomerPasswordDetails/CustomerPasswordDetails";

function CustomerPasswordComponent() {
  return (
    <Box display={"flex"} flexDirection={"column"} px={"30px"}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
            Customer
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Password
          </Typography>
        </Breadcrumbs>
      </Box>
      <CustomerPasswordDetails />
    </Box>
  );
}

export default CustomerPasswordComponent;
