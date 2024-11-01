import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { BLUE_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from "~/theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import dayjs from "dayjs";
import api from "~/config/axios";
import axios, { Axios } from "axios";
import { toast } from "react-toastify"; // Thêm thư viện react-toastify nếu dùng

function CustomerProfileDetails() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    phone: "",
    address: "",
    email: "",
  });
  const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
  const [password, setPassword] = useState("");

  const verifyPasswordAndSave = async () => {
    const response = await fetch("http://localhost:8080/accounts/verify-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userInfo.email, password }),
    });

    if (response.ok) {
        setShowPasswordOverlay(false); // Ẩn overlay
        await updateUserProfile(); // Gọi hàm cập nhật nếu mật khẩu đúng
    } else {
        toast.error("Incorrect password!"); // Hiển thị thông báo lỗi nếu mật khẩu sai
    }
};


  const handleChangeInfo = (field, value) => {
    setUserInfo((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateUserProfile = async () => {
    const updateBookingDTO = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      dob: userInfo.dob,
      phone: userInfo.phone,
      address: userInfo.address,
    };

    try {
      const token = localStorage.getItem("token");
      const accInfo = JSON.parse(localStorage.getItem("accountInfo"));

      const response = await fetch(
        `http://localhost:8080/accounts/update-by-email/${accInfo.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateBookingDTO),
        }
      );

      const data = await response.json();

      if (data.status === 200) {
        toast.success("Account updated successfully!");
      } else {
        toast.error("Failed to update account: " + data.message);
      }
    } catch (error) {
      console.error("Error updating account", error);
      toast.error("An error occurred while updating the account.");
    }
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    setShowPasswordOverlay(true); // Hiển thị overlay nhập mật khẩu
  };

  const handleGetUserInfo = () => {
    const accInfo = localStorage.getItem("accountInfo");
    if (accInfo) {
      const info = JSON.parse(accInfo);
      setUserInfo({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        dob: info.dob,
        address: info.address,
        phone: info.phone,
      });
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <div style={{ position: "relative" }}>
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
          Account
        </Typography>
      </Breadcrumbs>

      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <img
          src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/444483357_1023869129097783_5298444339195279755_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEooEKZIeiFTMc89kJ4sqbqX53yHN6hg2dfnfIc3qGDZ2tUCAB2vw0vTUjD6_lAaMtugbk-POIJZV6-86KGV_Wu&_nc_ohc=DZqmzg7KWQUQ7kNvgGjN7Hv&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=A0KQYsspStC_2WKaChv3_Io&oh=00_AYBXO6-A5KhMlEEUDtT8gXIbOw4Nv-qbgRBpmuZ09xihSw&oe=67145963"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />
        <Box>
          <Box sx={{ display: "flex", width: "400px", height: "30px", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                boxShadow: "none",
                fontSize: "16px",
                bgcolor: INPUT_FIELD_COLOR,
                borderRadius: "10px",
                height: "40px",
              }}
            >
              Upload new picture
            </Button>

            <Button
              variant="contained"
              sx={{
                boxShadow: "none",
                color: ORANGE_COLOR,
                fontSize: "16px",
                bgcolor: INPUT_FIELD_COLOR,
                borderRadius: "10px",
                height: "40px",
              }}
            >
              Delete picture
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Input */}
      <Box
        sx={{
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-around",
          gap: 10,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            First name
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Enter your first name"
            value={userInfo.firstName}
            onChange={(e) => handleChangeInfo("firstName", e.target.value)}
            variant="outlined"
            sx={{
              width: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                borderColor: BLUE_COLOR,
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
            Last name:
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Enter your last name"
            value={userInfo.lastName}
            onChange={(e) => handleChangeInfo("lastName", e.target.value)}
            variant="outlined"
            sx={{
              width: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                borderColor: BLUE_COLOR,
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
      </Box>

      <Box
        sx={{
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-around",
          gap: 10,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            Phone number
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Enter your phone number"
            value={userInfo.phone}
            variant="outlined"
            onChange={(e) => handleChangeInfo("phone", e.target.value)}
            sx={{
              width: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                borderColor: BLUE_COLOR,
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

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            Date of Birth
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              variant="outlined"
              sx={{
                overflow: "hidden",
                width: "500px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  borderColor: BLUE_COLOR,
                  height: "60px",
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
            >
              <DatePicker
                placeholder="Select your date"
                label=""
                value={dayjs(userInfo.dob)}
                onChange={(date) => handleChangeInfo("dob", date)}
                sx={{
                  backgroundColor: INPUT_FIELD_COLOR,
                  width: "600px",
                  borderRadius: "15px",
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>

      <Box sx={{ mt: 5, mb: "80px" }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Email</Typography>
        <TextField
          id="outlined-basic"
          placeholder="Enter your email"
          variant="outlined"
          value={userInfo.email}
          type="text"
          sx={{
            width: "1090px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              borderColor: BLUE_COLOR,
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

      <Box sx={{ mt: 5, mb: "80px" }}>
        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Address</Typography>
        <TextField
          id="outlined-basic"
          placeholder="Enter your address"
          variant="outlined"
          value={userInfo.address}
          onChange={(e) => handleChangeInfo("address", e.target.value)}
          type="text"
          sx={{
            width: "1090px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              borderColor: BLUE_COLOR,
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

      {/* Submit button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          marginBottom: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "200px",
            height: "fit-content",
            backgroundColor: BLUE_COLOR,
            borderRadius: "40px",
            justifyContent: "space-between",
            alignItems: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
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
      </Box>

      {showPasswordOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <Typography variant="h6">Enter Password</Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="contained" onClick={verifyPasswordAndSave}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfileDetails;
