// src/services/analysisService.ts
import axios from "axios";
import { z } from "zod";
import {
    DeepDiveConfigSchema,
    type DeepDiveConfig
} from "@/types/deep-dive"; // 复用 DeepDive 的 Config Schema
import {
    HeroApiResponseSchema,
    KpiApiResponseSchema,
    InsightApiResponseSchema,
    CoverageApiResponseSchema,
    SimulationApiResponseSchema,
    DecisionApiResponseSchema,
    type AnalysisDashboardData
} from "@/types/analysis";

// =========================================
// 1. Config Loader (Internal)
// =========================================
async function fetchAppConfig(): Promise<DeepDiveConfig> {
    try {
        const response = await fetch(`/config.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to load config.json");
        return DeepDiveConfigSchema.parse(await response.json());
    } catch (error) {
        console.error("[Analysis Service] Config Load Error:", error);
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
            "/analysis/latest", // 假设的新接口路径，请确认是否为 /analysis/latest
            {
                user_id: config.user_id,
                marketplace_id: config.marketplace_id,
                role: "BOSS", // 固定参数
                dimension_type: dimensionType,
            },
            {
                baseURL: config.api_base_url,
                // 显式处理 404 或空数据不抛错
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        // 空状态处理
        if (!data.data) return null;

        // 运行时校验
        return schema.parse(data.data);
    } catch (error) {
        console.warn(`[Analysis Service] Failed to fetch ${dimensionType}`, error);
        return null; // 允许部分失败，不阻塞页面渲染
    }
}

// =========================================
// 3. Main Data Aggregator
// =========================================
export const analysisService = {
    /**
     * 获取 Report 页面所有需要的数据 (并行请求)
     */
    fetchReportPageData: async (): Promise<AnalysisDashboardData> => {
        // 1. 获取配置
        const config = await fetchAppConfig();

        // 2. 并行发起所有请求
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
