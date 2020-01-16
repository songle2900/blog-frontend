import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';  // Reset everything
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // Replace a specific key value
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST'); // Write post
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);

// Create saga
const WritePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, WritePostSaga);
}

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, // Entering initialState changes it to the initial state
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value // Update a specific key value
        }),
        [WRITE_POST]: state => ({
            ...state,
            // Reset post & postError
            post: null,
            postError: null
        }),
        // Post write success
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        // Post write failure
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
            ...state,
            postError
        }),
        [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id
        })
    }, initialState
);

export default write;