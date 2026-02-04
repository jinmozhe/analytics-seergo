// ✅ 修复点：显式使用 'type' 关键字导入类型接口
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type AxiosError
} from "axios";

// 1. 创建 Axios 实例
const service: AxiosInstance = axios.create({
    // 自动从环境变量读取 https://chat.seergo.cn
    baseURL: import.meta.env.VITE_API_URL || "",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. 响应拦截器 (Response Interceptor)
service.interceptors.request.use(
    (config) => {
        console.log(`[HTTP] --> ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`[HTTP] <-- ${response.config.url} ${response.status}`);
        // 自动剥离 Axios 的壳，直接返回后端的 JSON
        return response.data;
    },
    (error: AxiosError) => {
        console.error("[HTTP Error]", error.message);
        return Promise.reject(error);
    }
);

// 3. 导出简化的 http 对象
export const http = {
    get: <T>(url: string, config?: AxiosRequestConfig) => {
        return service.get<T, T>(url, config);
    },

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
        return service.post<T, T>(url, data, config);
    }
};
