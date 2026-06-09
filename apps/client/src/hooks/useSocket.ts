import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { addMessage } from '../service/chat/reducer';
import type { IMessage } from '@repo/types';

let socket: Socket | null = null;

export const useSocket = (chatId?: string) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!chatId) return;

        // Initialize socket connection
        if (!socket) {
            socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3002', {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5,
                auth: {
                    token: localStorage.getItem('token'),
                },
            });

            socket.on('connect', () => {
                console.log('Socket connected:', socket?.id);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
        }

        // Join chat room
        socket?.emit('join-chat', { chatId });
        console.log('Joined chat room:', chatId);

        // Listen for new messages from Kafka via socket
        socket?.on('send-messages', (message: IMessage) => {
            console.log('New message received via socket:', message);
            dispatch(addMessage(message));
        });

        return () => {
            // Cleanup: leave room when component unmounts
            socket?.emit('leave-chat', { chatId });
            socket?.off('send-messages');
        };
    }, [chatId, dispatch]);

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;
