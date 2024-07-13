import {
    FETCH_USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    UPDATE_TOKENS_SUCCESS,
    UPDATE_USER_PROFILE
} from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: '',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            //console.log('action: ', action);
            return {
                ...state, account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email
                },
                isAuthenticated: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: '',
                },
                isAuthenticated: false
            };
        case UPDATE_TOKENS_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    access_token: action?.payload?.DT.access_token,
                    refresh_token: action?.payload?.DT.refresh_token
                }
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                account: {
                    ...state.account,
                    ...action.payload
                }
            };
        default: return state;
    }
};

export default userReducer;