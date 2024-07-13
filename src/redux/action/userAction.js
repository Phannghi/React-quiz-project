export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const UPDATE_TOKENS_SUCCESS = 'UPDATE_TOKENS_SUCCESS';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}
export const doLogOut = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    }
}

export const updateTokensSuccess = (data) => ({
    type: UPDATE_TOKENS_SUCCESS,
    payload: data
});

export const updateUserProfile = (data) => ({
    type: 'UPDATE_USER_PROFILE',
    payload: data
});