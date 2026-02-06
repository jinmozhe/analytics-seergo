// src/services/homeService.ts
import axios from "axios";
import { z } from "zod";
import {
    HomeConfigSchema,
    type HomeConfig,
    HomeHeroSchema,
    HomeResultsSchema,
    HomeModelsSchema,
    HomeProcessSchema,
    HomeComparisonSchema,
    HomeFinalCTASchema, // [新增]
    type HomeDashboardData
} from "@/types/home";

// =========================================
// 1. Config Loader (Internal)
// =========================================
async function fetchAppConfig(): Promise<HomeConfig> {
    try {
        // 添加时间戳防止缓存，确保获取最新的 API Base URL
        const response = await fetch(`/config.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to load config.json");

        // 使用 Home 专属的 Schema 进行校验，实现与 DeepDive 解耦
        return HomeConfigSchema.parse(await response.json());
    } catch (error) {
        console.error("[Home Service] Config Load Error:", error);
        throw error;
    }
}

// =========================================
// 2. Generic API Fetcher
// =========================================
async function fetchHomeData<T>(
    config: HomeConfig,
    dimensionType: string,
    schema: z.ZodType<T>
): Promise<T | null> {
    try {
        const { data } = await axios.post(
            "/analysis/latest",
            {
                user_id: config.user_id,
                marketplace_id: config.marketplace_id,
                role: "SYSTEM", // <--- 核心逻辑：首页强制使用 SYSTEM 角色
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
        // 记录具体的维度错误，但不阻塞整个页面加载（允许部分模块渲染或显示骨架屏）
        console.warn(`[Home Service] Failed to fetch ${dimensionType}`, error);
        return null;
    }
}

// =========================================
// 3. Main Data Aggregator
// =========================================
export const homeService = {
    /**
     * 获取 Home 页面所有需要的数据 (并行请求)
     * 遵循 Render-as-You-Fetch 模式
     */
    fetchHomePageData: async (): Promise<HomeDashboardData> => {
        // 1. 获取运行时配置
        const config = await fetchAppConfig();

        // 2. 并行发起所有模块的数据请求
        // 对应后端接口定义的 6 个维度
        const [
            heroData,
            resultsData,
            modelsData,
            processData,
            comparisonData,
            finalCTAData // [新增]
        ] = await Promise.all([
            fetchHomeData(config, "REPORT_HERO", HomeHeroSchema),
            fetchHomeData(config, "KPI_METRICS", HomeResultsSchema),
            fetchHomeData(config, "DECISION_CENTER", HomeModelsSchema),
            fetchHomeData(config, "AI_REVENUE_SIMULATION", HomeProcessSchema),
            fetchHomeData(config, "COVERAGE_PRECISION", HomeComparisonSchema),
            fetchHomeData(config, "FINAL_CTA", HomeFinalCTASchema), // [新增请求]
        ]);

        // 3. 返回聚合数据，供 Router Loader 使用
        return {
            heroData,
            resultsData,
            modelsData,
            processData,
            comparisonData,
            finalCTAData // [新增返回]
        };
    }
};
