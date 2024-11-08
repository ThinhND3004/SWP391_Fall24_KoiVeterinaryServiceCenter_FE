import React, { useEffect, useState, useRef } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { initializeWebSocket } from '~/utils/WebSocketUtils';

const NotificationHandler = () => {
    const [notifications, setNotifications] = useState([]);
    // const [accountId, setAccountId] = useState('');
    // const [description, setDescription] = useState('');
    const clientRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleOnConnect = (client) => {
        client.subscribe('/topic/notifications', (message) => {
            const notification = JSON.parse(message.body);
            console.log("Received notification: ", notification.data);

            const { accountEmail, title, description, type } = notification.data;
            setNotifications((prev) => [
                ...prev,
                { accountEmail, title, description, type }
            ]);
            enqueueSnackbar(description, { variant: 'success' });
        })
    }

    useEffect(() => {
        const client = initializeWebSocket({ handleConnect: handleOnConnect })
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    const handleClose = (
        event,
        reason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // npm

    // return (
    //     <div>
    //         <h2>Send Notification</h2>
    //         <input
    //             type="text"
    //             value={accountId}
    //             onChange={(e) => setAccountId(e.target.value)}
    //             placeholder="Enter account ID"
    //         />
    //         <input
    //             type="text"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             placeholder="Enter notification message"
    //         />
    //         <button onClick={sendNotification}>Send Notification</button>

    // return(
    //     <div>
    //         <h2>Received Notifications</h2>
    //         <ul>
    //             {notifications.map((notification, index) => (
    //                 <li key={index}>
    //                     {/* <strong>Account ID:</strong> {notification.account.id} <br /> //receiver// */} 
    //                     <strong>Description:</strong> {notification.description} <br />
    //                     <strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default NotificationHandler;
