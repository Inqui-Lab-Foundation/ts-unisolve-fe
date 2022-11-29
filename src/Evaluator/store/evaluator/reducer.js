// Foulders Reducers //
import {
    EVALUATOR_LOGIN_USER,
    EVALUATOR_LOGIN_USER_SUCCESS,
    EVALUATOR_LOGIN_USER_ERROR,
} from '../../../redux/actions.js';


const INIT_STATE = {
    currentUser: {},
    loading: false,
    error: '',
};

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case EVALUATOR_LOGIN_USER:
        return { ...state, loading: true, error: '' }; 
    case EVALUATOR_LOGIN_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            currentUser: action.payload, 
            error: '',
        };
    case EVALUATOR_LOGIN_USER_ERROR:
        return {
            ...state,
            loading: false,
            currentUser: null,
            error: action.payload.message,
        };
    default:
        return newState;
    }
};
