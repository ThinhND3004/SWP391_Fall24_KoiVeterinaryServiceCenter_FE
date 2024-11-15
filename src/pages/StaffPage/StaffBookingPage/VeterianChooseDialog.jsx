import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, styled, InputBase, alpha } from '@mui/material';
import { useEffect, useState } from "react";
import { GRAY_COLOR, INPUT_FIELD_COLOR, ORANGE_COLOR } from '~/theme';
import SearchIcon from '@mui/icons-material/Search'
import ManagementApi from '~/api/ManagementApi';
import { sendNotificationOnEmail } from '~/utils/WebSocketUtils';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: INPUT_FIELD_COLOR
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    }
}))

function VeterianChooseDialog({ bookingId, serviceName, serviceId, serviceMethod, startedAt, userAddress }) {

    const InfoCard = ({ veterian }) => {
        const [isSent, setIsSent] = useState(false);

        const handleSend = async () => {
            const date = new Date(startedAt);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            const time = `${hours}:${minutes}`;
            const formattedDate = `${day}/${month}/${year}`;

            // Send Notification
            sendNotificationOnEmail({
                bookingId: bookingId,
                accountEmail: veterian.email,
                title: 'Invitation',
                description: `You received a booking invitation to do ${serviceName} at ${formattedDate} ${hours}:${minutes} in ${userAddress ? userAddress : ' Koi Veterinary Clinic Center'}!`,
                type: 'YESNO',
                message: 'You received an invitation!',
                notiType: 'success'
            })
            
            // Send Email
            const sendEmailResp = await ManagementApi.sendInvitationEmail({
                to: veterian.email,
                recipientName: veterian.fullName,
                serviceName: serviceName,
                serviceMethod: serviceMethod,
                date: formattedDate,
                time: time,
                location: userAddress ? userAddress : 'At Center',
                referenceNumber: '0123456789',
                companyName: 'Company XXX',
                companyWebsite: 'http://localhost:5173/veterian/notifications'
            })

            if (sendEmailResp) {
                console.log("SEND EMAIL SUCCESSFUL")
            }

            setOpen(false)
        }

        const fetchIsSent = async () => {
            const result = await ManagementApi.checkIsNotificationSent({
                accountEmail: veterian.email,
                bookingId: bookingId
            })
            setIsSent(result)
        }

        useEffect(() => {
            fetchIsSent()
        }, [])

        return (
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}
                key={veterian.email}
            >
                {/* Picture on the left */}
                <Box
                    component="img"
                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    alt="Profile Picture"
                    sx={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        marginRight: '16px'
                    }}
                />

                {/* Name and Info on the right */}
                <Box>
                    <Typography variant="h5" component="h2">
                        {veterian.fullName}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {veterian.email}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">Certification: {veterian.certification || 'Empty certification'}</Typography>
                    <Typography variant="body1" color="textSecondary">Year Of Experience: {veterian.yearOfExperience || 'Empty Year Of Experience'}</Typography>
                    <Typography variant="body1" color="textSecondary">Education: {veterian.education || 'Empty education  '}</Typography>

                    {isSent === true ?
                        <Button variant="contained"
                            sx={{
                                margin: '5px 0px',
                                border: '1px solid',
                                backgroundColor: 'white',
                                borderColor: ORANGE_COLOR,
                                color: ORANGE_COLOR,
                                borderRadius: '10px',
                                boxShadow: 'none',
                            }}>
                            Is Sent
                        </Button>
                        :
                        <Button variant="contained"
                            onClick={() => handleSend()}
                            sx={{
                                margin: '5px 0px',
                                backgroundColor: ORANGE_COLOR,
                                color: 'whitesmoke',
                                borderRadius: '10px'
                            }}>
                            Send invitation
                        </Button>
                    }


                </Box>
            </Box>
        );
    };


    const [open, setOpen] = useState(false);
    const [idleVeterian, setIdleVeterian] = useState([]);
    const [tempVeterian, setTempVeterian] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleClickOpen = async () => {
        const veterianData = await ManagementApi.getIdleAccounts({ serviceId: serviceId, startDateTime: startedAt });
        setIdleVeterian(veterianData);
        setTempVeterian(veterianData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSearching = async (event) => {
        const searchValue = event.target.value || "";

        let returnData;
        if (searchValue === "") returnData = idleVeterian;
        else {
            returnData = idleVeterian.filter((data) => {
                return data.fullName.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        setSearchValue(searchValue);
        setTempVeterian(returnData.length > 0 ? returnData : []);
    }

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen}
                sx={{
                    margin: '5px 0px',
                    backgroundColor: ORANGE_COLOR,
                    color: 'whitesmoke',
                    borderRadius: '10px'
                }}>
                Find Veterian
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="booking-dialog-title"
                PaperProps={{
                    sx: {
                        width: '50%',
                    }
                }}
            >
                <DialogTitle sx={{
                    marginBottom: '5px',
                }}>
                    <Search sx={{
                        borderRadius: '10px',
                        bgcolor: INPUT_FIELD_COLOR
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: GRAY_COLOR, fontSize: '14px' }} />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ fontSize: '14px' }}
                            placeholder="Search by Veterian Name"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearching}
                        />
                    </Search>
                </DialogTitle>

                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {tempVeterian.length > 0 ?
                            tempVeterian.map((veterian) => {
                                return <InfoCard veterian={veterian} />
                            }) :
                            <div>No data available</div>
                        }
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'red' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog >
        </Box >
    )
}

export default VeterianChooseDialog;