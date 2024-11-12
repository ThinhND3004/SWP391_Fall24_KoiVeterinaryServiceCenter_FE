import { Box, Typography, Rating, DialogContent, DialogTitle, DialogContentText, Dialog, TextField, Button, DialogActions, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react';
import ManagementApi from '~/api/ManagementApi';
import { BLUE_COLOR, INPUT_FIELD_COLOR } from '~/theme';

const FeedbackDialog = ({ bookingId }) => {
    const [myFeedback, setMyFeedback] = useState(null)
    const [feedbacks, setFeedbacks] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const [value, setValue] = useState(0);
    const [comment, setComment] = useState('');

    const fetchMyFeedback = async () => {
        const data = await ManagementApi.getFeedbackFromTokenAndBooking({ bookingId: bookingId });
        setMyFeedback(data);
        if (data) setValue(myFeedback.starRating);
    }

    useEffect(() => {
        fetchMyFeedback();
    }, []);

    const handleCreate = async () => {
        if (!myFeedback) {
            const data = await ManagementApi.createFeedback({
                bookingId: bookingId,
                starRating: value,
                comment: comment,
                anonymous: false
            });
            setAlertOpen(true);
            fetchMyFeedback();
        }


    }

    return (
        <Box>
            <button
                style={{
                    width: '200px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: 'Poppins',
                    backgroundColor: BLUE_COLOR,
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
                onClick={() => setOpen(true)}
            >
                Feedbacks
            </button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: '600px',
                        maxWidth: '90%',
                        height: '650px',
                        bgcolor: INPUT_FIELD_COLOR,
                        borderRadius: '30px'
                    }
                }}
            >
                <DialogTitle sx={{ marginTop: 4 }}>
                    <Typography
                        sx={{ fontWeight: 600, fontSize: 20, textAlign: 'center' }}
                    >
                        Your Feedback
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}
                    >
                        Your feedback helps us improve—please take a moment to rate
                        our service!
                    </DialogContentText>


                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 1
                        }}
                    >
                        {/* Create */}
                        <Typography sx={{ fontWeight: 600, fontSize: 16, mt: 5 }}>Star Rating</Typography>
                        <Rating
                            name={myFeedback ? "read-only" : "simple-controlled"}
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />

                        <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: 16, mt: 5 }}>Feedback</Typography>
                            <TextField
                                id="outlined-basic"
                                placeholder='Enter your feedback'
                                variant="outlined"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    width: '550px',

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                        borderColor: BLUE_COLOR,
                                        // marginTop: '15px',
                                        '&.Mui-focused fieldset': {
                                            borderColor: BLUE_COLOR
                                        }
                                    },
                                    '& input': {
                                        backgroundColor: INPUT_FIELD_COLOR,
                                        padding: '20px 15px',
                                        fontSize: '16px',
                                        borderRadius: '15px'
                                    }
                                }}
                            />
                        </Box>
                        {/* <Box> */}
                        <Box>
                            {/* {feedbacks?.map((fb) => (
                                <Box key={fb.id || fb.uniqueIdentifier} sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 5 }}>
                                        <Typography sx={{ fontWeight: 500 }}>Fullname</Typography>
                                        <Rating
                                            name="read-only"
                                            value={fb.starRating}
                                            readOnly
                                            sx={{ fontSize: 20 }}
                                        />
                                    </Box>
                                    <Typography sx={{ fontSize: 14, mt: 1 }}>
                                        {fb.comment}
                                    </Typography>
                                </Box>
                            ))} */}

                        </Box>
                    </Box>

                </DialogContent>

                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <DialogActions>
                        {!myFeedback ?
                            <Button
                                onClick={handleCreate}
                                sx={{
                                    bgcolor: BLUE_COLOR,
                                    borderRadius: '14px',
                                    color: 'white',
                                    width: '100px',
                                    height: '40px',
                                    mr: 6,
                                    mb: 3
                                }}
                            >
                                Create
                            </Button> : null
                        }

                        <Button
                            onClick={() => setOpen(false)}
                            sx={{
                                bgcolor: INPUT_FIELD_COLOR,
                                border: 2,
                                borderColor: BLUE_COLOR,
                                borderRadius: '14px',
                                color: 'white',
                                width: '100px',
                                height: '40px',
                                mr: 6,
                                mb: 3
                            }}
                        >
                            <Typography color={BLUE_COLOR}>Close</Typography>
                        </Button>
                    </DialogActions>
                </Box>


            </Dialog>

            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}>
                <Alert
                    onClose={()=> setAlertOpen}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Create Successful!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default FeedbackDialog;