// src/lib/deep-dive-constants.ts
import {
    PieChart,
    BarChart2,
    Layers,
    FileText,
    Video,
    Users,
    Box,
    type LucideIcon
} from "lucide-react";

/**
 * UI 映射配置接口
 * 定义每个枚举值对应的视觉元素
 */
export interface DeepDiveUIConfig {
    label: string;
    icon: LucideIcon;
    color?: string; // 预留字段，用于未来可能的颜色主题映射
}

/**
 * 1. 报告类型映射 (Report Type Mapping)
 * Key: 后端 API 返回的 report_type
 * Value: 前端显示的配置
 */
export const REPORT_TYPE_MAP: Record<string, DeepDiveUIConfig> = {
    "DIAGNOSTIC": {
        label: "诊断报告",
        icon: PieChart
    },
    "EFFECT": {
        label: "效果报告",
        icon: BarChart2
    }
};

/**
 * 2. 报告明细来源映射 (Report Source Mapping)
 * Key: 后端 API 返回的 report_source
 * Value: 前端显示的配置
 */
export const REPORT_SOURCE_MAP: Record<string, DeepDiveUIConfig> = {
    "COMPREHENSIVE": { label: "综合诊断", icon: PieChart },
    "SP_ASIN": { label: "SP 商品推广 (ASIN)", icon: Layers },
    "SP_KEYWORD": { label: "SP 关键词", icon: FileText },
    "SB_ASIN": { label: "SB 品牌推广 (ASIN)", icon: Layers },
    "SB_KEYWORD": { label: "SB 关键词", icon: FileText },
    "SB_VIDEO": { label: "SB 视频广告", icon: Video },
    "SD_AUDIENCE": { label: "SD 受众投放", icon: Users },
    "SD_OTHER": { label: "SD 其他", icon: Box },
};

/**
 * 兜底配置 (Fallback)
 * 当后端返回了前端未定义的类型时使用，防止页面报错
 */
export const UNKNOWN_REPORT_CONFIG: DeepDiveUIConfig = {
    label: "未知类型",
    icon: Box
};
