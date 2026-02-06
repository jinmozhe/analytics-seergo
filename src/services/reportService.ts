// src/services/reportService.ts
import axios from "axios";
import { z } from "zod";
import {
    DeepDiveConfigSchema,
    type DeepDiveConfig
} from "@/types/deep-dive";
import {
    HeroApiResponseSchema,
    KpiApiResponseSchema,
    InsightApiResponseSchema,
    CoverageApiResponseSchema,
    SimulationApiResponseSchema,
    DecisionApiResponseSchema,
    type AnalysisDashboardData
} from "@/types/report";

// =========================================
// 1. Config Loader (Internal)
// =========================================
async function fetchAppConfig(): Promise<DeepDiveConfig> {
    try {
        // 添加时间戳防止缓存
        const response = await fetch(`/config.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to load config.json");
        return DeepDiveConfigSchema.parse(await response.json());
    } catch (error) {
        console.error("[Report Service] Config Load Error:", error);
        throw error;
    }
}

// =========================================
// 2. Generic API Fetcher
// =========================================
async function fetchAnalysisData<T>(
    config: DeepDiveConfig,
    dimensionType: string,
    schema: z.ZodType<T>
): Promise<T | null> {
    try {
        const { data } = await axios.post(
            "/analysis/latest",
            {
                user_id: config.user_id,
                marketplace_id: config.marketplace_id,
                role: "BOSS",
                dimension_type: dimensionType,
            },
            {
                baseURL: config.api_base_url,
                // 允许 2xx 响应，业务层面的空数据由 schema 校验或下方逻辑处理
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        // API 响应结构保护：如果 data.data 为空，返回 null
        if (!data || !data.data) return null;

        // Zod 运行时校验：确保后端返回的数据结构严格符合前端组件要求
        return schema.parse(data.data);
    } catch (error) {
        // 记录具体的维度错误，但不阻塞整个页面加载（允许部分模块渲染）
        console.warn(`[Report Service] Failed to fetch ${dimensionType}`, error);
        return null;
    }
}

// =========================================
// 3. Main Data Aggregator
// =========================================
export const reportService = {
    /**
     * 获取 Report 页面所有需要的数据 (并行请求)
     * 遵循 Render-as-You-Fetch 模式
     */
    fetchReportPageData: async (): Promise<AnalysisDashboardData> => {
        // 1. 获取运行时配置
        const config = await fetchAppConfig();

        // 2. 并行发起所有模块的数据请求
        // 使用 Promise.all 确保最大化并发性能，消除瀑布流
        const [
            heroData,
            kpiData,
            insightData,
            coverageData,
            simulationData,
            decisionData
        ] = await Promise.all([
            fetchAnalysisData(config, "REPORT_HERO", HeroApiResponseSchema),
            fetchAnalysisData(config, "KPI_METRICS", KpiApiResponseSchema),
            fetchAnalysisData(config, "ANALYST_INSIGHTS", InsightApiResponseSchema),
            fetchAnalysisData(config, "COVERAGE_PRECISION", CoverageApiResponseSchema),
            fetchAnalysisData(config, "AI_REVENUE_SIMULATION", SimulationApiResponseSchema),
            fetchAnalysisData(config, "DECISION_CENTER", DecisionApiResponseSchema),
        ]);

        // 3. 返回聚合数据，供 Router Loader 使用
        return {
            heroData,
            kpiData,
            insightData,
            coverageData,
            simulationData,
            decisionData
        };
    }
};
