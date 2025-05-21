/** @format */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface FailedRequests {
    resolve: (value: AxiosResponse) => void;
    reject: (value: AxiosError) => void;
    config: AxiosRequestConfig;
    error: AxiosError;
}

const axiosInstance = axios.create({
    // Truy suất đến biến môi trường VITE_URL trong file .env thông qua import.meta.env
    baseURL: import.meta.env.VITE_URL,
    headers: {
        // chỉ đúng khi yêu cầu vừ trả về dữ liệu dạng json
        // nếu gửi đi là ảnh hoặc file thì không phải dạng json mà là multipart/form-data
        "Content-Type": "application/json",
    }
    // lý do không có header vì nếu truyền dữ liệu dạng json và yêu cầu server trả
    // về dữ liệu dạng json thì type = application/json
    // Nếu truyền dạng ảnh hoặc file thì type = multipart/form-data
});

let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequestConfig = error.config!;
        if (status !== 401) {
            return Promise.reject(error);
        }
        if (isTokenRefreshing) {
            return new Promise((resolve, reject) => {
                failedRequests.push({
                    resolve,
                    reject,
                    config: originalRequestConfig,
                    error: error,
                });
            });
        }
        isTokenRefreshing = true;

        try {
            const response = await axiosInstance.post("/access-token", {
                refreshToken: JSON.parse(localStorage.getItem("refreshToken") ?? ""),
            });
            const { accessToken = null, refreshToken = null } = response?.data ?? {};
            if (!accessToken || !refreshToken) {
                throw new Error("Something went wrong while refreshing your access token");
            }
            window.localStorage.setItem("access-token", accessToken);
            window.localStorage.setItem("refresh-token", refreshToken);
            failedRequests.forEach(({ resolve, reject, config }) => {
                axiosInstance(config)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
            });
        } catch (_error: unknown) {
            console.log(_error);
            failedRequests.forEach(({ reject, error }) => reject(error));
            localStorage.setItem("accessToken", "");
            localStorage.setItem("refreshToken", "");
            return Promise.reject(error);
        } finally {
            failedRequests = []
            isTokenRefreshing = false
        }
        return axiosInstance(originalRequestConfig)
    }
);

export { axiosInstance };
