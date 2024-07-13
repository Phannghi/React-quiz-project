import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store"
import { postRefreshToken } from "../services/apiService";
import axiosRetry from 'axios-retry';
import { updateTokensSuccess } from "../redux/action/userAction";
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200
})
const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});

axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => {
        // Chỉ thử lại nếu lỗi là do token hết hạn
        return error.response && error.response.data && error.response.data.EC === -999;
    },
    retryDelay: (retryCount) => {
        return retryCount * 1000; // Tăng thời gian chờ giữa các lần thử lại
    }
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    //console.log('check store', store?.getState());

    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    //console.log('check interceptor: ', response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async function (error) {
    NProgress.done();
    // token expired
    if (error.response.data && error.response.data.EC === -999) {
        const originalRequest = error.config;
        const refreshToken = store?.getState()?.user?.account?.refresh_token;
        const email = store?.getState()?.user?.account?.email;
        try {
            const response = await postRefreshToken(email, refreshToken);
            console.log('check res:', response);
            if (response.EC === 0) {
                // Dispatch action để cập nhật token mới vào Redux store
                store.dispatch(updateTokensSuccess(response));

                // Cập nhật header Authorization với token mới
                originalRequest.headers['Authorization'] = `Bearer ${response.DT.access_token}`;

                // Gửi lại request ban đầu với token mới
                return instance(originalRequest);
            }
        } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            // Chuyển hướng đến trang đăng nhập nếu làm mới token thất bại
            window.location.href = '/login';
        }
    }
    //npm axios retry

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('run error: ', error.response);
    return error && error.response && error.response.data ?
        error.response.data : Promise.reject(error);
});
export default instance;