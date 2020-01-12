import client from './client';

// API function

// Login
export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

// Register
export const register = ({ username, password }) =>
    client.post('/api/auth/register', { username, password });

// Check login status
export const check = () => client.get('/api/auth/check');