import React, { useEffect, useState, useRef } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { initializeWebSocket } from '~/utils/WebSocketUtils';

const NotificationHandler = ({ subscribeTo }) => {
    const [notifications, setNotifications] = useState([]);
    // const [accountId, setAccountId] = useState('');
    // const [description, setDescription] = useState('');
    const clientRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleOnConnect = (client) => {
        client.subscribe(subscribeTo, (message) => {
            const notification = JSON.parse(message.body);
            console.log("Received notification: ", notification.data);

            const { accountEmail, title, description, type } = notification.data;
            setNotifications((prev) => [
                ...prev,
                { accountEmail, title, description, type, message }
            ]);
            enqueueSnackbar(notification.message, { variant: notification.notiType});
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
};

export default NotificationHandler;
