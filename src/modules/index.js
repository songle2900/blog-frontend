import { combineReducers } from 'redux';
import auth from './auth';

// root reducer
const rootReducer = combineReducers({
    auth,
});

export default rootReducer;