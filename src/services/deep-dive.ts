// src/services/deep-dive.ts
import axios from "axios";
import {
    DeepDiveConfigSchema,
    type DeepDiveConfig,
    type ReportAPIResponse
} from "@/types/deep-dive";

/**
 * 1. 获取运行时配置 (Load Runtime Config)
 * 从 public/config.json 读取配置，并使用 Zod 验证完整性。
 * @throws Error 如果加载失败或配置格式不正确
 */
export async function fetchDeepDiveConfig(): Promise<DeepDiveConfig> {
    try {
        // 添加时间戳参数 (t=Date.now()) 以防止浏览器缓存旧的配置文件
        const response = await fetch(`/config.json?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error(`Failed to load config.json: ${response.statusText}`);
        }

        const json = await response.json();

        // 使用 Zod Schema 进行运行时验证
        // 如果 JSON 缺少 user_id 或 url 格式错误，这里会抛出详细错误
        const config = DeepDiveConfigSchema.parse(json);

        return config;
    } catch (error) {
        console.error("[Deep Dive] Config Load Error:", error);
        throw error; // 继续抛出，由 Router ErrorBoundary 捕获
    }
}

/**
 * 2. 获取报告列表 (Fetch Report List)
 * 使用传入的动态配置发起请求，不依赖全局静态 http 实例。
 */
export async function fetchReportList(config: DeepDiveConfig): Promise<ReportAPIResponse> {
    // 动态构建请求，确保使用 config.json 中最新的 api_base_url
    const { data } = await axios.post<ReportAPIResponse>(
        "/marketing/reports/list",
        {
            user_id: config.user_id,
            marketplace_id: config.marketplace_id
        },
        {
            baseURL: config.api_base_url, // ✅ 核心：使用运行时配置的 URL
            headers: {
                "Content-Type": "application/json"
            },
            // 可以根据需要设置独立的超时，不影响全局设置
            timeout: 20000
        }
    );

    if (data.code !== "success") {
        throw new Error(data.message || "API returned non-success code");
    }

    return data;
}
