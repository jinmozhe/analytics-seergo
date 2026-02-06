// src/services/deep-dive.ts
import axios from "axios";
import { z } from "zod";
import {
    DeepDiveConfigSchema,
    QAMessageSchema,
    InitQAResponseSchema,
    type DeepDiveConfig,
    type ReportAPIResponse,
    type QAMessage
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

/**
 * 3. 获取对话历史 (Get Chat History)
 */
export async function fetchQAHistory(
    config: DeepDiveConfig,
    reportId: string
): Promise<QAMessage[]> {
    const { data } = await axios.post(
        "/marketing/qa/history",
        {
            user_id: config.user_id,
            marketplace_id: config.marketplace_id,
            report_id: reportId
        },
        {
            baseURL: config.api_base_url,
            headers: { "Content-Type": "application/json" }
        }
    );

    if (data.code !== "success") {
        throw new Error(data.message || "Failed to fetch history");
    }

    // 运行时校验返回数组
    return z.array(QAMessageSchema).parse(data.data);
}

/**
 * 4. 初始化对话 (Init QA Session)
 * 返回 qa_id 用于建立 SSE 连接
 */
export async function initiateQA(
    config: DeepDiveConfig,
    reportId: string,
    question: string
): Promise<string> {
    const { data } = await axios.post(
        "/marketing/qa/ask",
        {
            user_id: config.user_id,
            marketplace_id: config.marketplace_id,
            report_id: reportId,
            question
        },
        {
            baseURL: config.api_base_url,
            headers: { "Content-Type": "application/json" }
        }
    );

    if (data.code !== "success") {
        throw new Error(data.message || "Failed to initiate QA");
    }

    const { qa_id } = InitQAResponseSchema.parse(data.data);
    return qa_id;
}

/**
 * 5. 获取 SSE 流地址 (Helper)
 */
export function getQAStreamUrl(config: DeepDiveConfig, qaId: string): string {
    // 移除 baseURL 末尾的斜杠，避免双斜杠
    const baseUrl = config.api_base_url.replace(/\/$/, "");
    return `${baseUrl}/marketing/qa/stream/${qaId}`;
}
