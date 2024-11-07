// notificationUtils.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client;

export const initializeWebSocket = ({ handleConnect }) => {
    const socket = new SockJS('http://localhost:8080/ws');
    client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
            console.log('Connected to WebSocket')
            handleConnect(client);
        },
        onDisconnect: () => console.log('Disconnected from WebSocket'),
        onStompError: (frame) => console.error('Broker error: ' + frame.headers['message']),
    });
    client.activate();

    return client;
};

export const sendNotification = async ({ accountEmail, title, description, type }) => {
    if (client && client.connected) {
        try {
            client.publish({
                destination: '/app/send',
                body: JSON.stringify({ accountEmail, title, description, type }),
            });

        } catch (error) {
            console.error('Error sending notification:', error);
        }
    } else {
        console.error('Client not connected');
    }
};
