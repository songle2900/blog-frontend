import axios from 'axios';

const client = axios.create();

/*
    Global setting example:
    
    // Use API address elsewhere
    client.defaults.baseURL = 'https://external-api-server.com/'

    // Header setting
    client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

    // Interceptor Settings
    axios.intercepter.response.use({
        response => {
            // Take specific action on successful request
            return response;
        },
        error => {
            // Take specific action on request failure
            return Promise.reject(error);
        }
    })
*/

export default client;