/* eslint-disable semi */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { format } from 'date-fns';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  TextField
} from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {
  BLUE_COLOR,
  GRAY_COLOR,
  INPUT_FIELD_COLOR,
  ORANGE_COLOR
} from '~/theme';
import GradeIcon from '@mui/icons-material/Grade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '~/config/axios';
import FeedbackDialog from './FeedbackDialog';
import CustomerReportDialog from './CustomerReportDialog';

export default function BookingListDetails() {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState('all'); // Default to showing all services
  const [open, setOpen] = useState(false);
  const [openPaymentInfo, setOpenPaymentInfo] = useState(false);
  const [openDialogs, setOpenDialogs] = useState({});
  const navigate = useNavigate();
  const [RateValue, setRateValue] = React.useState(2);
  const [currAppId, setCurrAppId] = useState('')
  const [feedbacks, setFeedbacks] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');
      let bookingList = [];
      if (token) {
        try {
          const response = await api.get(
            '/bookings?page=1&unitPerPage=10'
          );

          if (!response) throw new Error('Failed to fetch appointments');

          bookingList = await response.data;
          setAppointments(bookingList.data);
        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        }
      } else {
        navigate('/login');
      }
      console.log(bookingList.data);
    };

    fetchAppointments();
  }, [navigate]);

  const sortedAppointments = [...appointments]
    .filter(
      (appointment) => sortBy === 'all' || appointment.serviceName === sortBy
    )
    .sort((a, b) => {
      if (sortBy === 'startedAt') {
        return new Date(a.startedAt) - new Date(b.startedAt);
      }
      return a.serviceName.localeCompare(b.serviceName);
    });

  const handleClose = () => {
    setOpen(false);

    if (comment !== '') {
      const postComment = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await api.post('/feedbacks', {
              bookingId: currAppId,
              starRating: value,
              comment,
              anonymous: true
            });

            if (!response) throw new Error('Failed to fetch appointments');

          } catch (error) {
            console.error('Failed to fetch appointments:', error);
          }
        } else {
          navigate('/login');
        }
        setComment('')
      }
      postComment()
    }
  }
  const handleClickOpen = (id) => {
    setCurrAppId(id)
    setOpen(true);

    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      let feedbackList = [];
      if (token) {
        try {
          const response = await api.get(`/feedbacks?page=1&unitPerPage=10&bookingId=${id}`);

          if (!response) throw new Error('Failed to fetch appointments');

          feedbackList = await response.data;
          setFeedbacks(feedbackList.data);
          console.log(feedbackList);

        } catch (error) {
          console.error('Failed to fetch appointments:', error);
        }
      } else {
        navigate('/login');
      }
    };
    if (!id) return

    fetchFeedbacks()
  }
  // const handleClickOpenPaymentInfo = () => setOpenPaymentInfo(true);
  // const handleClosePaymentInfo = () => setOpenPaymentInfo(false);

  // Mở dialog cho một appointment cụ thể
  const handleDialogOpen = (id) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [id]: true
    }));
  };

  // Đóng dialog cho một appointment cụ thể
  const handleDialogClose = (id) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [id]: false
    }));
  };
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const notify = () => toast.error('View payment info feature is under development')

  return (
    <div>
      <Box>
        <Typography
          sx={{
            fontFamily: 'SVN-Konga Pro',
            fontSize: 150,
            color: BLUE_COLOR,
            textAlign: 'center'
          }}
        >
          Bookings
        </Typography>
      </Box>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          alignItems: 'center',
          gap: 10
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Sort by:</Typography>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: '800px',
            height: '40px',
            borderRadius: '14px',
            padding: '5px',
            backgroundColor: INPUT_FIELD_COLOR,
            border: '1px solid #bdbdbd'
          }}
        >
          <option value="all">All Services</option>
          <option value="Online Consultant">Online Consultant</option>
          <option value="Koi Treatment at home">Koi Treatment At Home</option>
          <option value="Koi Treatment at center">
            Koi Treatment At Center
          </option>
        </select>
      </div>

      {sortedAppointments.length > 0 ? (
        sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              border: '1px solid #bdbdbd',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '15px',
              backgroundColor: INPUT_FIELD_COLOR,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FaCalendarAlt />
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                {appointment.serviceName}
              </h3>
            </div>

            <div style={{ fontSize: '16px' }}>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                  Veterinarian:
                </Typography>
                <Typography sx={{ fontWeight: 500, mt: 1 }}>
                  {appointment.veterinarianFullName}
                </Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                  Meeting method:
                </Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>
                  {appointment.meetingMethod}
                </Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                  Start time:
                </Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>
                  {format(new Date(appointment.startedAt), 'dd/MM/yyyy HH:mm')}
                </Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>Status:</Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>
                  {appointment.statusEnum}
                </Typography>
              </p>
              <p style={{ display: 'flex', gap: 3 }}>
                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                  Created At:
                </Typography>
                <Typography sx={{ fontWeight: 400, mt: 1 }}>
                  {format(new Date(appointment.createdAt), 'dd/MM/yyyy HH:mm')}
                </Typography>
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px',
                borderTop: '1px solid #E0E0E0',
                paddingTop: '15px'
              }}
            >
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
                  // onClick={() => alert("View payment info feature is under development")}
                  // onClick={notify}
                  onClick={() => handleDialogOpen(appointment.id)}
                >
                  Payment Info
                </button>

                <Dialog
                  open={openDialogs[appointment.id] || false} // Kiểm tra trạng thái của dialog
                  onClose={() => handleDialogClose(appointment.id)} // Đóng dialog
                  PaperProps={{
                    sx: {
                      width: '600px',
                      maxWidth: '90%',
                      bgcolor: INPUT_FIELD_COLOR,
                      borderRadius: '30px'
                    }
                  }}
                >
                  <DialogTitle sx={{ marginTop: 4 }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 20, textAlign: 'center' }}
                    >
                      Payment Info
                    </Typography>
                  </DialogTitle>
                  <DialogContent>

                    <DialogContentText
                      sx={{ fontWeight: 600, fontSize: 14, textAlign: 'center' }}
                    >
                      {/* Payment Info */}
                    </DialogContentText>
                    <Box mt={2}>
                      <Typography variant="h5">Booking Details:</Typography>
                      <Typography variant="body1">
                        Customer Name: {appointment.customerFullName}
                      </Typography>
                      <Typography variant="body1">
                        Service: {appointment.serviceName}
                      </Typography>
                      <Typography variant="body1">
                        Meeting Method: {appointment.meetingMethod}
                      </Typography>
                      <Typography variant="body1">
                        Veterinarian: {appointment.veterinarianFullName}
                      </Typography>

                      <Typography variant="body1">
                        Type: {appointment.type}
                      </Typography>

                      {appointment.serviceName === 'Pond Quality' && (
                        <Typography variant="body1">
                          Pond Size: {appointment.pondSize}
                        </Typography>
                      )}

                      {appointment.serviceName !== 'Pond Quality' &&
                        appointment.serviceName !== 'Online Consultant' && (
                          <Typography variant="body1">
                            Quantity: {appointment.koiQuantity}
                          </Typography>
                        )}

                      {appointment.meetingMethod !== 'ONLINE' &&
                        appointment.meetingMethod !== 'OFFLINE_CENTER' && (
                          <Typography variant="body1">
                            Address: {appointment.userAddress}
                          </Typography>
                        )}

                      {appointment.meetingMethod !== 'ONLINE' &&
                        appointment.meetingMethod !== 'OFFLINE_CENTER' && (
                          <Typography variant="body1">
                            Distance: {appointment.distance_meters}
                          </Typography>
                        )}

                      <Typography variant="body1">
                        Start At: {appointment.startedAt}
                      </Typography>
                      <Typography variant="body1">
                        Status: {appointment.statusEnum}
                      </Typography>

                      <Typography variant="body1">
                        Service Price:{' '}
                        {new Intl.NumberFormat('vi-VN').format(
                          appointment.servicePrice
                        )}{' '}
                        VND
                      </Typography>

                      {appointment.serviceName === 'Pond Quality' && (
                        <Typography variant="body1">
                          Pond Price:{' '}
                          {new Intl.NumberFormat('vi-VN').format(
                            appointment.pondPrice
                          )}{' '}
                          VND
                        </Typography>
                      )}

                      {appointment.serviceName !== 'Pond Quality' &&
                        appointment.serviceName !== 'Online Consultant' && (
                          <Typography variant="body1">
                            Koi Price:{' '}
                            {new Intl.NumberFormat('vi-VN').format(
                              appointment.koiPrice
                            )}{' '}
                            VND
                          </Typography>
                        )}

                      {appointment.meetingMethod !== 'ONLINE' &&
                        appointment.meetingMethod !== 'OFFLINE_CENTER' && (
                          <Typography variant="body1">
                            Travel Price:{' '}
                            {new Intl.NumberFormat('vi-VN').format(
                              appointment.travelPrice
                            )}{' '}
                            VND
                          </Typography>
                        )}

                      <Typography variant="body1">
                        Total Price:{' '}
                        {new Intl.NumberFormat('vi-VN').format(
                          appointment.totalPrice
                        )}{' '}
                        VND
                      </Typography>

                      <Typography variant="body1">
                        Created At: {appointment.createdAt}
                      </Typography>
                    </Box>

                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => handleDialogClose(appointment.id)} // Đóng dialog
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
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

                <ToastContainer />
              </Box>
              { appointment.statusEnum === 'COMPLETED' ? <CustomerReportDialog bookingId={appointment.id}/> : null}
              { appointment.statusEnum === 'COMPLETED' ? <FeedbackDialog bookingId={appointment.id}/> : null}
  
            </div>
          </div>
        ))
      ) : (
        <Box sx={{ mb: 5, mt: 5 }}>
          <p
            style={{
              textAlign: 'center',
              color: ORANGE_COLOR,
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            No appointments available
          </p>
        </Box>
      )}
    </div>
  );
}
