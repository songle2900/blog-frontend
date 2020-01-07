import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value}) => ({
    form,   // register, login
    key,    // username, password, passwordConfrim
    value   // The actual value want to replace
}));

export const initializeForm = createAction(INITIALIZE_FORM, form => form);  // register / login

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfrim: ''
    },
    login: {
        username: '',
        password: ''
    }
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value;   // Example: change state.register.username
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form]
        })
    }, initialState
);

export default auth;