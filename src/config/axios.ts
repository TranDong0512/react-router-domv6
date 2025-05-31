/** @format */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface FailedRequests {
    resolve: (value: AxiosResponse) => void;
    reject: (value: AxiosError) => void;
    config: AxiosRequestConfig;
    error: AxiosError;
}

// khi call api thì phải truyền token lên header
// Nếu mà token hết hạn => với các ứng dụng cần bảo mật cao thì nên cho đăng xuất luôn
// Còn như fb hay mxh, trang bán hàng thì nó làm 1 việc là cấp lại token mới khi token cũ hết hạn làm tăng trải nghiệm
// Thông qua interceptors.response
// Nó được phép truy cập vào các req đang được thực thi
// Các req nào bị fail thì push vào mảng failedRequests
// Sau đó trước khi thực hiện đến các phương thức như get push ... thì nó sẽ call api refresh token để cập nhật lại token mới
// Dữ liệu truyền lên là refresh token ( khi login thì api trả về access token và refresh token của người dùng)
// accsess token và refresh token cơ bản là giống nhau chỉ khác nhau ở thời gian sống ( access thì tầm phút đến tiếng tối 
// đa 1 ngày còn refresh thì tầm 7 ngày đến 15 ngày )
// - nếu refresh token hết hạn => logout ( cả 2 token hết hạn )
// - nếu access token hết hạn => refresh token còn hạn thì khi call lên api /access-token sẽ được trả về access token mới và
//  refresh token mới
// Lưu 2 token vào localStorage hoặc cookie
// có thể không trả về refresh token thì sẽ lưu refresh token của người dùng trên server hoặc trả về thông qua cookies

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
        // apo login của json server auth => access và refresh token
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
