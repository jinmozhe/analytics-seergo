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
    ad_type: string;        // E.g., "SP", "SB", "SBV", "SD", "DSP"
    period_start: string;
    period_end: string;
    report_type: string;    // E.g., "DIAGNOSTIC", "EFFECT"
    report_source: string;  // E.g., "ASIN", "KEYWORD"
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
// 3. Shared Types & Enums
// =========================================

// 用于 Chat 组件上下文判断的报告类型
// 对应 ad_type 的小写形式，用于加载对应的 AI 模型头像/提示语
export type ReportType = 'sp' | 'sb' | 'sbv' | 'sd' | 'dsp';

// 数据预览指标 (用于 Mock 数据展示或未来扩展)
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

// Level 1: 周期选项
export interface TimeOption {
    id: string;
    label: string;
    dateRange: string;
    periodStart?: string;
    periodEnd?: string;
}

// Level 2: 广告类型选项
export interface AdTypeOption {
    id: string;
    label: string;
    icon?: ElementType<{ className?: string;[key: string]: unknown }>;
}

// Level 3: 报告类型选项 (原 Category)
export interface ReportTypeOption {
    id: string;
    label: string;
    icon?: ElementType<{ className?: string;[key: string]: unknown }>;
}

// Level 4: 报告明细选项
export interface DetailOption {
    id: string;
    label: string;
}

// 核心状态管理：4 层级联
export interface DeepDiveState {
    timeId: string;       // 选中周期
    adTypeId: string;     // 选中广告类型 (SP/SB/SD...)
    reportTypeId: string; // 选中报告类型 (诊断/效果)
    detailId: string;     // 选中明细 (ASIN/关键词)
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

// 前端 UI 使用的聊天消息状态
export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'system';
    text: string;
    timestamp: number;
    isStreaming?: boolean; // 标记是否正在流式生成
}

// 初始化 QA 响应
export const InitQAResponseSchema = z.object({
    qa_id: z.string().uuid(),
});
