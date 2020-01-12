import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE';  // Reset everything
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // Replace a specific key value

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value
}));

const initialState = {
    title: '',
    body: '',
    tags: []
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, // Entering initialState changes it to the initial state
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value // Update a specific key value
        })
    }, initialState
);

export default write;