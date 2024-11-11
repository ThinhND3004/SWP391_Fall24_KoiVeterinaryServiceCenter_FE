/* eslint-disable indent */
import { Box, Breadcrumbs, Typography } from "@mui/material"
import NotificationItem from "./StaffNotification"
import { useEffect, useState } from "react";
import ManagementApi from "~/api/ManagementApi";

function StaffNotificationPage() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const data = await ManagementApi.getCurrentNotifications();
        setNotifications(data);
    }

    useEffect(() => {
        fetchNotifications();
    }, [])
    

    const handleDelete = async (notification) => {
        const result = await ManagementApi.deleteNotificationById(notification.id);
        if (result) {
            setNotifications(prevNotifications =>
                prevNotifications.filter(n => n.id !== notification.id)
            );
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
                <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    onNo={() => handleDelete(notification)}
                />
            ))}
        </Box>
    );
}
export default StaffNotificationPage