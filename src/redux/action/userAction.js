export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOOUT_SUCCESS = 'USER_LOOUT_SUCCESS';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}
export const doLogOut = () => {
    return {
        type: USER_LOOUT_SUCCESS,
    }
}