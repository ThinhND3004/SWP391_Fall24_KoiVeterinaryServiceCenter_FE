/* eslint-disable indent */
import { Box, Breadcrumbs, Typography } from "@mui/material"
import NotificationItem from "./VeterianNotification"
import { useEffect, useState } from "react";
import ManagementApi from "~/api/ManagementApi";
import { sendNotification } from "~/utils/WebSocketUtils";
import TimeUtils from "~/utils/TimeUtils";
import dayjs from "dayjs";

function VeterianNotificationPage() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const data = await ManagementApi.getCurrentNotifications();
        setNotifications(data);
    }

    useEffect(() => {
        fetchNotifications();
    }, [])


    const handleYes = async (notification) => {
        console.log("BOOKING ID: ",notification)
        const result = await ManagementApi.assignVeterianToBooking({
            bookingId: notification.bookingId,
            veterianEmail: notification.accountEmail
        })
        if(result){
            // Remove notification
            setNotifications(prevNotifications =>
                prevNotifications.filter(n => n.id !== notification.id)
            );
            sendNotification({
                accountEmail: notification.senderEmail,
                bookingId: notification.bookingId,
                title: 'Accept Invitation',
                description: `${notification.accountFullName} have accepted your invitation!`,
                type: 'DEFAULT',
                message:  `${notification.accountFullName} have accepted your invitation!`,
                notiType: 'success'
            })

            // Send email 
            await ManagementApi.sendInvitationResultEmail({
                to: notification.senderEmail,
                recipientName: notification.senderFullName,
                veterianName: notification.accountFullName,
                bookingId: notification.bookingId,
                isAccepted: true,
                dateTime: TimeUtils.formatDateTime(dayjs().format()),
                companyName: 'Koi Veterinary Service Center'
            })
        }
    };

    const handleNo = async (notification) => {
        const result = await ManagementApi.deleteNotificationById(notification.id);
        if(result) {
            setNotifications(prevNotifications =>
                prevNotifications.filter(n => n.id !== notification.id)
            );
            sendNotification({
                accountEmail: notification.senderEmail,
                bookingId: notification.bookingId,
                title: 'Reject Invitation',
                description: `${notification.accountFullName} had rejected your invitation!`,
                type: 'DEFAULT',
                message:  `${notification.accountFullName} have rejected your invitation!`,
                notiType: 'error'
            })

            await ManagementApi.sendInvitationResultEmail({
                to: notification.senderEmail,
                recipientName: notification.senderFullName,
                veterianName: notification.accountFullName,
                bookingId: notification.bookingId,
                isAccepted: false,
                dateTime: TimeUtils.formatDateTime(dayjs().format()),
                companyName: 'Company XXX'
            })
        }
        
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column'
        }}>
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                        Admin
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                        Notifications
                    </Typography>
                </Breadcrumbs>
            </Box>
            {notifications.map((notification) => (
                console.log("Notification: ", notification),
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    type={notification.type}
                    onYes={() => handleYes(notification)}
                    onNo={() => handleNo(notification)}
                />
            ))}
        </Box>
    );
}
export default VeterianNotificationPage