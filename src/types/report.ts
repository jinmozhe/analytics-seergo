import { z } from "zod";

// =========================================
// 1. Enums & Unions (State Values)
// =========================================

// 战略目标 (Decision Console)
export const StrategyGoalSchema = z.enum(["roi", "sales", "balance"]);
export type StrategyGoal = z.infer<typeof StrategyGoalSchema>;

// 预算调整模式 (Decision Console)
export const BudgetModeSchema = z.enum(["inc", "hold", "dec"]);
export type BudgetMode = z.infer<typeof BudgetModeSchema>;

// 扩量/优化方向 (Decision Console)
export const ExpandPathSchema = z.enum(["asin", "kw", "structure"]);
export type ExpandPath = z.infer<typeof ExpandPathSchema>;

// 报告类型 (Hero Dropdown)
export const ReportTypeSchema = z.enum(["sp", "sb", "sd"]);
export type ReportType = z.infer<typeof ReportTypeSchema>;

// =========================================
// 2. Data Structures (Content Models)
// =========================================

// --- Decision Console Models ---

export const StrategyOptionSchema = z.object({
    id: StrategyGoalSchema,
    label: z.string(),
    modeLabel: z.string(), // e.g. "安全模式"
    desc: z.string(),
    isRecommended: z.boolean().optional(),
});
export type StrategyOption = z.infer<typeof StrategyOptionSchema>;

export const ControlOptionSchema = z.object({
    id: z.string(),
    label: z.string(),
});
export type ControlOption = z.infer<typeof ControlOptionSchema>;

// --- Hero Models ---

export const ReportFilterSchema = z.object({
    id: ReportTypeSchema,
    label: z.string(),
    selected: z.boolean(),
});
export type ReportFilter = z.infer<typeof ReportFilterSchema>;

// --- KpiOverview Models ---

export const MetricItemSchema = z.object({
    label: z.string(),
    value: z.string(),
    trend: z.string().optional(), // e.g. "+12.5%"
    trendUp: z.boolean().optional(), // true = green/good, false = red/bad
    subValue: z.string().optional(), // e.g. "Sold" annotation
});
export type MetricItem = z.infer<typeof MetricItemSchema>;

// 差距分析卡片 (Gap Analysis)
export const GapCardDataSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(), // e.g. "差距扩大", "未达标"
    statusColor: z.enum(["red", "orange"]), // Map to Tailwind colors

    // Primary Metric
    currentValue: z.string(),
    currentLabel: z.string(),
    targetValue: z.string(),
    targetLabel: z.string(),

    // Progress Bar
    progress: z.number(), // 0-100

    // Alert Footer
    alertMessage: z.string(), // HTML string allowed for highlights
    alertTrend: z.string().optional(),
});
export type GapCardData = z.infer<typeof GapCardDataSchema>;

// --- AiSimulation Models ---

export const SimulationDataSchema = z.object({
    currentRoi: z.string(),
    currentGap: z.string(),
    currentSales: z.string(),
    currentSpend: z.string(),

    predictedRoi: z.string(),
    predictedGrowth: z.string(),
    optimizedSpend: z.string(),
    optimizedSpendChange: z.string(),
    predictedSales: z.string(),
    predictedSalesChange: z.string(),

    confidence: z.string(),
});
export type SimulationData = z.infer<typeof SimulationDataSchema>;

// --- AnalystInsight Models ---

export const InsightDataSchema = z.object({
    roi: z.string(),
    summary: z.string(),
    analystName: z.string(),
    strategies: z.array(z.object({
        title: z.string(),
        tag: z.string(),
        desc: z.string(),
        priority: z.enum(["high", "immediate"]),
    })),
});
export type InsightData = z.infer<typeof InsightDataSchema>;
