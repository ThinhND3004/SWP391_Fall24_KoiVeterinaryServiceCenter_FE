import React, { useState, useEffect } from "react";
import { Box, Breadcrumbs, TextField, Typography, Button } from "@mui/material";
import { BLUE_COLOR, INPUT_FIELD_COLOR } from "~/theme";
import { toast } from "react-toastify"; // Thêm thư viện react-toastify nếu dùng
import api from "~/config/axios";

function CustomerPasswordDetails() {
  const [accountInfo, setAccountInfo] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load accountInfo from localStorage when the component mounts
  useEffect(() => {
    const storedAccountInfo = localStorage.getItem("accountInfo");
    console.log("Stored account info:", storedAccountInfo); // Log the raw data from localStorage
    if (storedAccountInfo) {
      setAccountInfo(JSON.parse(storedAccountInfo));
      console.log("Parsed account info:", JSON.parse(storedAccountInfo)); // Log the parsed data
    }
  }, []);

  const handleSaveChanges = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const changePasswordRequest = {
      email: accountInfo.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    console.log(changePasswordRequest);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/accounts/change-password", {
        changePasswordRequest
      });

      const data = await response.json();
      console.log(data);

      if (data.status === 200) {
        // alert(data.message);
        toast.success(data.message);
      } else {
        // alert("Failed to change password: " + data.message);
        toast.error("Failed to change password: " + data.message);
      }
    } catch (error) {
      console.error("Error changing password", error);
      alert("An error occurred while changing the password.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "40px",
          gap: 3,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Enter your old password
          </Typography>
          <TextField
            type="password"
            placeholder="Enter your old password"
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "60px",
                marginTop: "15px",
                "&.Mui-focused fieldset": {
                  borderColor: BLUE_COLOR,
                },
              },
              "& input": {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: "20px 15px",
                fontSize: "16px",
                borderRadius: "15px",
              },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Enter your new password
          </Typography>
          <TextField
            type="password"
            placeholder="Enter your new password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "60px",
                marginTop: "15px",
                "&.Mui-focused fieldset": {
                  borderColor: BLUE_COLOR,
                },
              },
              "& input": {
                backgroundColor: INPUT_FIELD_COLOR,
                padding: "20px 15px",
                fontSize: "16px",
                borderRadius: "15px",
              },
            }}
          />
        </Box>

        <Button
        variant="contained"
        color="secondary"
        onClick={handleSaveChanges}
        sx={{
          width: "250px",
          height: "60px",
          backgroundColor: BLUE_COLOR,
          color: "#fff",
          fontFamily: "Poppins",
          fontWeight: 600,
          fontSize: "16px",
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        Save changes
      </Button>
      </Box>
    </div>
  );
}

export default CustomerPasswordDetails;
