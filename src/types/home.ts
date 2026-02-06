// src/types/home.ts
import { z } from "zod";

// =========================================
// 0. Runtime Configuration (Home Context)
// =========================================
// [新增] 仅定义 Home 页面需要的配置字段，实现与 DeepDive 解耦
export const HomeConfigSchema = z.object({
    api_base_url: z.string(),
    user_id: z.string(),
    marketplace_id: z.string(),
});
export type HomeConfig = z.infer<typeof HomeConfigSchema>;

// =========================================
// 1. Hero Section (API: REPORT_HERO)
// =========================================
export const HomeHeroSchema = z.object({
    tech_stack: z.array(z.object({
        name: z.string(),
        theme: z.enum(["blue", "indigo", "purple", "orange", "emerald", "cyan"]),
    })),
    headline: z.object({
        prefix: z.string(),
        highlight_1: z.string(),
        connector: z.string(),
        highlight_2: z.string(),
    }),
    subheadline: z.string(),
    cta_buttons: z.object({
        primary: z.string(),
        secondary: z.string(),
    }),
    social_proof: z.object({
        count: z.string(),
        text_prefix: z.string(),
        text_highlight: z.string(),
        text_suffix: z.string(),
    }),
});
export type HomeHeroData = z.infer<typeof HomeHeroSchema>;

// =========================================
// 2. Results Section (API: KPI_METRICS)
// =========================================
export const HomeResultsSchema = z.object({
    header: z.object({
        title_main: z.string(),
        title_highlight: z.string(),
        description: z.string(),
    }),
    cards: z.object({
        loss_list: z.object({
            title: z.string(),
            subtitle: z.string(),
            description: z.string(),
            items: z.array(z.object({
                label: z.string(),
                tag: z.string(),
                tag_color: z.enum(["red", "orange", "emerald", "blue"]),
            })),
            stats: z.object({
                label_1: z.string(),
                value_1: z.string(),
                label_2: z.string(),
                value_2: z.string(),
            }),
        }),
        opportunity_list: z.object({
            title: z.string(),
            subtitle: z.string(),
            description: z.string(),
            items: z.array(z.object({
                label: z.string(),
                tag: z.string(),
                tag_color: z.enum(["red", "orange", "emerald", "blue"]),
            })),
            stats: z.object({
                label_1: z.string(),
                value_1: z.string(),
                label_2: z.string(),
                value_2: z.string(),
            }),
        }),
        execution_log: z.object({
            title: z.string(),
            subtitle: z.string(),
            description: z.string(),
            stats: z.object({
                label_1: z.string(),
                value_1: z.string(),
                label_2: z.string(),
                value_2: z.string(),
            }),
        }),
    }),
    execution_logs_data: z.array(z.object({
        time: z.string(),
        title: z.string(),
        action: z.string(),
        reason: z.string(),
        expectation: z.string(),
        type: z.enum(["success", "warning", "danger"]),
    })),
});
export type HomeResultsData = z.infer<typeof HomeResultsSchema>;

// =========================================
// 3. Models Section (API: DECISION_CENTER)
// =========================================
export const ModelTabSchema = z.enum(["profit", "traffic", "capital", "competition"]);
export type ModelTab = z.infer<typeof ModelTabSchema>;

export const HomeModelsSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
    }),
    tabs: z.array(z.object({
        id: ModelTabSchema,
        short_title: z.string(),
        subtitle: z.string(),
        full_title: z.string(),
        pain_point: z.string(),
        core_feature: z.string(),
        details: z.array(z.string()),
    })),
});
export type HomeModelsData = z.infer<typeof HomeModelsSchema>;

// =========================================
// 4. Process Section (API: AI_REVENUE_SIMULATION)
// =========================================
export const HomeProcessSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        description: z.string(),
    }),
    stages: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        icon_key: z.string(),
        desc_top: z.string(),
        desc_bottom: z.string(),
    })),
});
export type HomeProcessData = z.infer<typeof HomeProcessSchema>;

// =========================================
// 5. Comparison Section (API: COVERAGE_PRECISION)
// =========================================
export const HomeComparisonSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_connector: z.string(),
        title_suffix: z.string(),
    }),
    table_rows: z.array(z.object({
        dim: z.string(),
        icon_path: z.string(),
        rule: z.string(),
        seergo: z.string(),
    })),
    feature_cards: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        theme: z.enum(["purple", "blue"]),
    })),
});
export type HomeComparisonData = z.infer<typeof HomeComparisonSchema>;

// =========================================
// 6. Final CTA Section (API: FINAL_CTA) [新增]
// =========================================
export const HomeFinalCTASchema = z.object({
    title_main: z.string(),
    title_highlight: z.string(),
    description: z.string(),
    buttons: z.object({
        primary: z.string(),
        secondary: z.string(),
    }),
    trust_badges: z.array(z.object({
        id: z.string(), // 用于前端判断渲染具体图标 (如 'aws', 'security', 'verified')
        line_1: z.string(),
        line_2: z.string(),
    })),
});
export type HomeFinalCTAData = z.infer<typeof HomeFinalCTASchema>;

// =========================================
// Aggregated Dashboard Data
// =========================================
export type HomeDashboardData = {
    heroData: HomeHeroData | null;
    resultsData: HomeResultsData | null;
    modelsData: HomeModelsData | null;
    processData: HomeProcessData | null;
    comparisonData: HomeComparisonData | null;
    finalCTAData: HomeFinalCTAData | null; // [新增]
};
