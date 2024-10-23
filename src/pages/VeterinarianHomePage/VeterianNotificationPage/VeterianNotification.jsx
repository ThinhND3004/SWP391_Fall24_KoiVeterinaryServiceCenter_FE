import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";


function NotificationItem({ title, description, onYes, onNo }) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={onYes}>
          Yes
        </Button>
        <Button variant="outlined" color="secondary" onClick={onNo}>
          No
        </Button>
      </Stack>
    </Box>
  );
}
export default NotificationItem