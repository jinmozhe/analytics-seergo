// Remove unused 'z' import to fix TS6133
// import { z } from "zod"; 

// =========================================
// 1. Report Configuration Types (New Logic)
// =========================================

// Time Range
export interface TimeOption {
    id: string;
    label: string;
    dateRange: string;
}

// Report Category
export type ReportCategory = 'diagnosis' | 'performance';

export interface CategoryOption {
    id: ReportCategory;
    label: string;
    icon?: any;
}

// Report Detail
export type ReportDetailId =
    | 'comprehensive'
    | 'sp-asin' | 'sp-kw'
    | 'sb-asin' | 'sb-video' | 'sb-kw'
    | 'sd-audience' | 'sd-other';

// Broad Type (Used for mapping back to AI Context)
export type BroadReportType = 'sp' | 'sb' | 'sd';

// ✅ COMPATIBILITY ALIAS: 
// Maps BroadReportType to ReportType so existing components don't break
export type ReportType = BroadReportType;

export interface ReportDetailOption {
    id: ReportDetailId;
    label: string;
    broadType: BroadReportType;
}

// State Interface
export interface DeepDiveState {
    timeId: string;
    categoryId: ReportCategory;
    detailId: ReportDetailId;
}

// =========================================
// 2. Data Preview Types (Restored)
// =========================================

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
// 3. Chat & AI Types (Restored)
// =========================================

export type MessageRole = 'system' | 'user' | 'model';

export interface ChatMessage {
    id: string;
    role: MessageRole;
    text: string;
    timestamp: number;
    isTyping?: boolean;
}
