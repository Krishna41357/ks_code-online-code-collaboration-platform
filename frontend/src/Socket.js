import {io} from 'socket.io-client';

export const initSocket = async () =>{
    
    const options = {
        'force new connection': true,
        reconnectionAttempts : 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
        auth: {
      token: localStorage.getItem('token') // Add token for authentication
    }
    };
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://localhost:5000' ;
    return io(BACKEND_URL, options);
}