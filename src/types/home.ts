import { z } from "zod";

// --- Core Enums & Unions ---

// 模型 Tab 类型 (联合类型)
export const ModelTabSchema = z.enum([
    "profit",
    "traffic",
    "capital",
    "competition",
]);
export type ModelTab = z.infer<typeof ModelTabSchema>;

// 日志类型 (用于状态颜色映射)
export const LogTypeSchema = z.enum(["success", "warning", "danger"]);
export type LogType = z.infer<typeof LogTypeSchema>;

// --- Data Entities ---

// 1. 技术栈项目 (Hero Section)
export const TechItemSchema = z.object({
    name: z.string(),
    color: z.string(),     // Tailwind text color class
    border: z.string(),    // Tailwind border hover class
    iconColor: z.string(), // Tailwind bg color class
});
export type TechItem = z.infer<typeof TechItemSchema>;

// 2. 自动化日志 (Results Section - Execution)
export const ExecutionLogSchema = z.object({
    time: z.string(),
    title: z.string(),
    action: z.string(),
    reason: z.string(),
    expectation: z.string(),
    type: LogTypeSchema,
});
export type ExecutionLog = z.infer<typeof ExecutionLogSchema>;

// 3. 对比表格行 (Comparison Section)
export const ComparisonRowSchema = z.object({
    dim: z.string(),      // 维度
    iconPath: z.string(), // SVG Path d attribute
    rule: z.string(),     // 传统规则描述
    human: z.string(),    // 人工描述
    seergo: z.string(),   // AI 优势描述
    highlight: z.boolean().default(false),
});
export type ComparisonRow = z.infer<typeof ComparisonRowSchema>;

// 4. 模型详情内容 (Models Section)
// 将原 Angular switch-case 逻辑重构为静态配置结构
export const ModelContentSchema = z.object({
    id: ModelTabSchema,
    shortTitle: z.string(), // 左侧导航短标题
    subtitle: z.string(),   // 左侧导航英文副标题
    fullTitle: z.string(),  // 右侧面板主标题
    painPoint: z.string(),  // 痛点文案
    coreFeature: z.string(),// 核心功能标签
    details: z.array(z.string()), // 详细说明列表
});
export type ModelContent = z.infer<typeof ModelContentSchema>;
