import qs from 'qs';
import client from './client';

// Write API
export const writePost = ({ title, body, tags }) =>
    client.post('/api/posts', { title, body, tags });

// Read API
export const readPost = id => client.get(`/api/posts/${id}`);

// List API
export const listPosts = ({ page, username, tag }) => {
    const queryString = qs.stringify({
        page,
        username,
        tag
    });
    return client.get(`/api/posts?${queryString}`);
};

// Update API
export const updatePost = ({ id, title, body, tags }) => client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags
});

// Remove API
export const removePost = id => client.delete(`/api/posts/${id}`);