// src/lib/deep-dive-constants.ts
import {
    PieChart,
    BarChart2,
    Layers,
    FileText,
    Video,
    Box,
    Megaphone,    // For SB (品牌推广)
    BoxSelect,    // For SP (商品推广)
    MonitorPlay,  // For SD (展示推广)
    Globe,        // For DSP (全域流量)
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
 * 1. 广告类型映射 (Ad Type Mapping) [NEW]
 * Key: 后端 API 返回的 ad_type
 */
export const AD_TYPE_MAP: Record<string, DeepDiveUIConfig> = {
    "SP": {
        label: "商品推广 (SP)",
        icon: BoxSelect
    },
    "SB": {
        label: "品牌推广 (SB)",
        icon: Megaphone
    },
    "SBV": {
        label: "品牌视频 (SBV)",
        icon: Video
    },
    "SD": {
        label: "展示推广 (SD)",
        icon: MonitorPlay
    },
    "DSP": {
        label: "DSP 广告",
        icon: Globe
    }
};

/**
 * 2. 报告类型映射 (Report Type Mapping)
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
 * 3. 报告明细来源映射 (Report Source Mapping) [UPDATED]
 * Key: 后端 API 返回的 report_source
 * Value: 前端显示的配置
 * 注意：这里不再包含 ad_type 前缀，仅映射维度
 */
export const REPORT_SOURCE_MAP: Record<string, DeepDiveUIConfig> = {
    "ASIN": {
        label: "商品/ASIN 维度",
        icon: Layers
    },
    "KEYWORD": {
        label: "关键词/Targeting",
        icon: FileText
    }
};

/**
 * 兜底配置 (Fallback)
 * 当后端返回了前端未定义的类型时使用，防止页面报错
 */
export const UNKNOWN_REPORT_CONFIG: DeepDiveUIConfig = {
    label: "未知类型",
    icon: Box
};
