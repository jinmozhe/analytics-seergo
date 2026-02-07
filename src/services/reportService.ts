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
    DataEvidenceApiResponseSchema,
    ReasoningFrameworkApiResponseSchema,
    type AnalysisDashboardData
} from "@/types/report";

// =========================================
// 1. Config Loader (Internal)
// =========================================
async function fetchAppConfig(): Promise<DeepDiveConfig> {
    try {
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
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        if (!data || !data.data) return null;
        return schema.parse(data.data);
    } catch (error) {
        console.warn(`[Report Service] Failed to fetch ${dimensionType}`, error);
        return null;
    }
}

// =========================================
// 3. Main Data Aggregator
// =========================================
export const reportService = {
    fetchReportPageData: async (): Promise<AnalysisDashboardData> => {
        const config = await fetchAppConfig();

        const [
            heroData,
            kpiData,
            insightData,
            evidenceData,
            coverageData,
            simulationData,
            decisionData,
            reasoningData
        ] = await Promise.all([
            fetchAnalysisData(config, "REPORT_HERO", HeroApiResponseSchema),
            fetchAnalysisData(config, "KPI_METRICS", KpiApiResponseSchema),
            fetchAnalysisData(config, "ANALYST_INSIGHTS", InsightApiResponseSchema),
            fetchAnalysisData(config, "DATA_EVIDENCE", DataEvidenceApiResponseSchema),
            fetchAnalysisData(config, "COVERAGE_PRECISION", CoverageApiResponseSchema),
            fetchAnalysisData(config, "AI_REVENUE_SIMULATION", SimulationApiResponseSchema),
            fetchAnalysisData(config, "DECISION_CENTER", DecisionApiResponseSchema),
            fetchAnalysisData(config, "REASONING_FRAMEWORK", ReasoningFrameworkApiResponseSchema),
        ]);

        return {
            heroData,
            kpiData,
            insightData,
            evidenceData,
            coverageData,
            simulationData,
            decisionData,
            reasoningData
        };
    }
};
