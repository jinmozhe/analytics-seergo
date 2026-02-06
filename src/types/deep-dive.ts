// src/types/deep-dive.ts
import type { ElementType } from "react";
import { z } from "zod";

// =========================================
// 1. Runtime Configuration (public/config.json)
// =========================================

export const DeepDiveConfigSchema = z.object({
    user_id: z.string().min(1, "Config Error: user_id is missing"),
    marketplace_id: z.string().min(1, "Config Error: marketplace_id is missing"),
    api_base_url: z.string().min(1, "Config Error: api_base_url is missing"),
});

export type DeepDiveConfig = z.infer<typeof DeepDiveConfigSchema>;

// =========================================
// 2. API Response Types (Backend Contract)
// =========================================

export interface ReportAPIItem {
    id: string;
    period_start: string;
    period_end: string;
    report_type: string;
    report_source: string;
    pdf_path: string | null;
}

export interface ReportAPIResponse {
    code: string;
    message: string;
    request_id: string;
    timestamp: string;
    data: ReportAPIItem[];
}

// =========================================
// 3. Shared Types & Enums (The Missing Parts)
// =========================================

// 宽泛的报告类型 (用于 Chat 上下文切换)
export type BroadReportType = 'sp' | 'sb' | 'sd';

// 兼容别名 (DeepDiveChat.tsx 中使用了 ReportType)
export type ReportType = BroadReportType;

// 数据预览指标 (用于 Mock 数据展示)
export interface DataPreviewMetrics {
    totalSpend: string;
    totalSales: string;
    acos: string;
    roas: string;
    impressions: string;
    clicks: string;
    ctr: string;
    cpc: string;
}

// =========================================
// 4. Frontend UI Component Types (Strict)
// =========================================

export interface TimeOption {
    id: string;
    label: string;
    dateRange: string;
    periodStart?: string;
    periodEnd?: string;
}

export interface CategoryOption {
    id: string;
    label: string;
    icon?: ElementType<{ className?: string;[key: string]: unknown }>;
}

export interface DetailOption {
    id: string;
    label: string;
    // 这里引用了 BroadReportType，必须确保它在上面已定义
    broadType?: BroadReportType;
}

// 兼容别名
export type ReportDetailOption = DetailOption;

export interface DeepDiveState {
    timeId: string;
    categoryId: string;
    detailId: string;
}

// =========================================
// 5. Chat & RAG Types
// =========================================

// QA 消息结构 (对应后端 /qa/history 响应)
export const QAMessageSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(), // Markdown content
    status: z.enum(["PENDING", "GENERATING", "COMPLETED", "FAILED"]),
    created_at: z.string(),
});

export type QAMessage = z.infer<typeof QAMessageSchema>;

// 前端使用的聊天消息状态 (扩展自 API 类型以支持 UI 状态)
export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'system';
    text: string;
    timestamp: number;
    isStreaming?: boolean; // 标记这条消息是否正在生成中
}

// 初始化 QA 响应
export const InitQAResponseSchema = z.object({
    qa_id: z.string().uuid(),
});
