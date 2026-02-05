// src/types/deep-dive.ts
import { z } from "zod";

// =========================================
// 1. Runtime Configuration (public/config.json)
// =========================================

export const DeepDiveConfigSchema = z.object({
    user_id: z.string().min(1, "Config Error: user_id is missing"),
    marketplace_id: z.string().min(1, "Config Error: marketplace_id is missing"),
    // 允许相对路径 (如 /api/v1)，移除 .url() 校验
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
// 3. Frontend UI Component Types (Strict)
// =========================================

// 周期选项
export interface TimeOption {
    id: string;
    label: string;
    dateRange: string;
    // 设为可选，以兼容 Mock 数据（Mock 数据没有这两个字段）
    periodStart?: string;
    periodEnd?: string;
}

// 报告类型选项
export interface CategoryOption {
    id: string;
    label: string;
    // 显式允许 icon 属性 (any 是为了兼容 lucide-react 组件引用)
    icon?: any;
}

// 报告明细选项
export interface DetailOption {
    id: string;
    label: string;
    // 增加 broadType 用于 AI 上下文推断 (sp/sb/sd)
    broadType?: BroadReportType;
}

// 兼容旧代码的别名 (Mock数据中使用的是 ReportDetailOption)
export type ReportDetailOption = DetailOption;

// UI 筛选器状态
export interface DeepDiveState {
    timeId: string;
    categoryId: string;
    detailId: string;
}

// =========================================
// 4. Chat & Mock Data Types (Restored)
// =========================================

// 宽泛的报告类型 (用于 Chat 上下文切换)
export type BroadReportType = 'sp' | 'sb' | 'sd';
// 兼容别名
export type ReportType = BroadReportType;

// 聊天消息接口
export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'system';
    text: string;
    timestamp: number;
}

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
