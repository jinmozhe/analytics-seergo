// src/types/report.ts
import { z } from "zod";

// =========================================
// 1. Report Hero (Updated based on Static Hero.tsx)
// =========================================
const HeroActionCardSchema = z.object({
    id: z.string(),
    type: z.enum(["primary", "secondary"]),
    title: z.string(),
    subtitle: z.string(),
    link_url: z.string(),
});

export const HeroApiResponseSchema = z.object({
    eyebrow_text: z.string(),
    main_title_line_1: z.string(),
    main_title_line_2: z.string(),
    subtitle_prefix: z.string(),
    subtitle_suffix: z.string(),
    description: z.string(), // 支持 HTML
    footer_validation_text: z.string(),
    cards: z.array(HeroActionCardSchema),
});
export type HeroApiResponse = z.infer<typeof HeroApiResponseSchema>;

// =========================================
// 2. KPI Metrics (Updated based on Static KpiOverview.tsx)
// =========================================
const KpiSuperSummaryItemSchema = z.object({
    label: z.string(),
    value: z.string(),
    trend_value: z.string(),
    trend_direction: z.enum(["up", "down"]).optional(),
});

const KpiBottomBarItemSchema = z.object({
    label: z.string(),
    value: z.string(),
});

const KpiGapCardSchema = z.object({
    id: z.string(),
    type: z.enum(["chart", "progress"]),
    title: z.string(),
    status_tag: z.string(),
    status_color: z.enum(["blue", "orange"]),
    current_value: z.string(),
    current_label: z.string(),
    target_value: z.string(),
    target_label: z.string(),
    progress_percent: z.number(),
    chart_data: z.array(z.number()).optional(),
    footer_html: z.string(),
});

export const KpiApiResponseSchema = z.object({
    header: z.object({
        title_highlight: z.string(),
        title_suffix: z.string(),
        subtitle: z.string(),
    }),
    super_summary: z.object({
        sales: KpiSuperSummaryItemSchema,
        volume: KpiSuperSummaryItemSchema,
        roi: KpiSuperSummaryItemSchema,
    }),
    bottom_bar: z.object({
        spend: KpiBottomBarItemSchema,
        sales: KpiBottomBarItemSchema,
        volume: KpiBottomBarItemSchema,
        roi: KpiBottomBarItemSchema,
    }),
    gap_cards: z.array(KpiGapCardSchema),
});
export type KpiApiResponse = z.infer<typeof KpiApiResponseSchema>;

// =========================================
// 3. Analyst Insights (Updated based on Static AnalystInsight.tsx)
// =========================================
export const InsightApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
    }),
    summary_card: z.object({
        tag: z.string(),
        title_main: z.string(),
        title_highlight: z.string(),
        content_p1_html: z.string(),
        content_quote_html: z.string(),
        analyst: z.object({
            avatar_url: z.string(),
            name: z.string(),
            tags: z.array(z.string()),
        }),
    }),
    strategy_card: z.object({
        top_label: z.string(),
        main_title: z.string(),
        sub_title: z.string(),
        list_header: z.string(),
        list_status: z.string(),
        list_items: z.array(z.object({
            id: z.string(),
            type: z.enum(["warning", "info"]),
            title: z.string(),
            desc: z.string(),
            tag: z.string(),
            icon_key: z.string(),
        })),
    }),
});
export type InsightApiResponse = z.infer<typeof InsightApiResponseSchema>;

// =========================================
// 4. Data Evidence (Updated based on Static DataEvidence.tsx)
// =========================================

// [新增] 质量指标通用 Schema
const QualityMetricSchema = z.object({
    label: z.string(),
    value: z.string(),
    sub: z.string(),
});

// [新增] 警报框 Schema
const QualityAlertSchema = z.object({
    title: z.string(),
    message: z.string(),
    stat: z.string(),
    stat_label: z.string(),
});

export const DataEvidenceApiResponseSchema = z.object({
    header: z.object({
        title_highlight: z.string(),
        title_suffix: z.string(),
        subtitle: z.string(),
    }),
    // 精准度板块 (Precision)
    precision: z.object({
        title: z.string(),
        subtitle: z.string(),
        score: z.string(),
        chart: z.object({
            strong_percent: z.number(),      // 强相关比例 (45)
            weak_percent: z.number(),        // 弱相关比例 (30)
            irrelevant_percent: z.number(),  // 不相关比例 (25)
        }),
        metrics: z.array(QualityMetricSchema),
        source_note: z.string(),
        alert: QualityAlertSchema,
    }),
    // 覆盖度板块 (Coverage)
    coverage: z.object({
        title: z.string(),
        subtitle: z.string(),
        score: z.string(),
        chart_percent: z.number(),           // 20格图表的激活百分比 (60)
        metrics: z.array(QualityMetricSchema),
        source_note: z.string(),
        alert: QualityAlertSchema,
    }),
});
export type DataEvidenceApiResponse = z.infer<typeof DataEvidenceApiResponseSchema>;

// =========================================
// 5. Coverage & Precision (Legacy / Alternative)
// =========================================
const CoverageMetricItemSchema = z.object({
    label: z.string(),
    value: z.string(),
    sub: z.string().optional(),
    sub_label: z.string().optional(),
});

export const CoverageApiResponseSchema = z.object({
    header: z.object({
        title_highlight: z.string(),
        title_suffix: z.string(),
        subtitle: z.string(),
    }),
    footer_note: z.string().optional(),

    coverage_section: z.object({
        step_label: z.string(),
        main_title: z.string(),
        chart_percent: z.number(),
        metrics: z.object({
            positive: CoverageMetricItemSchema,
            negative: CoverageMetricItemSchema,
        }).or(z.array(CoverageMetricItemSchema)),

        alert_box: z.object({
            title: z.string(),
            message_html: z.string(),
        }),
    }),
    precision_section: z.object({
        step_label: z.string(),
        main_title: z.string(),
        bars: z.array(z.object({
            label: z.string(),
            sub: z.string().optional(),
            value: z.number(),
            color_class: z.string(),
        })),
        footer_note: z.string().optional(),
    }),
});
export type CoverageApiResponse = z.infer<typeof CoverageApiResponseSchema>;


// =========================================
// 6. AI Revenue Simulation (Updated based on Static HTML)
// =========================================
export const SimulationApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
    }),
    prediction_highlight: z.object({
        tag_label: z.string(),
        main_text_1: z.string(),
        main_text_2: z.string(),
        description: z.string(),
        value: z.string(),
        period: z.string(),
        value_label: z.string(),
        footer_note: z.string(),
    }),
    current_status_card: z.object({
        title: z.string(),
        tag: z.string(),
        metrics: z.object({
            sales_label: z.string(),
            sales_value: z.string(),
            roas_label: z.string(),
            roas_value: z.string(),
            profit_label: z.string(),
            profit_value: z.string(),
        }),
        analysis_content: z.string(),
    }),
    simulation_card: z.object({
        title: z.string(),
        subtitle: z.string(),
        confidence_score: z.string(),
        metrics: z.object({
            sales_label: z.string(),
            sales_value: z.string(),
            sales_change: z.string(),
            roas_label: z.string(),
            roas_value: z.string(),
            roas_change: z.string(),
            profit_label: z.string(),
            profit_value: z.string(),
            profit_change: z.string(),
        }),
    }),
});
export type SimulationApiResponse = z.infer<typeof SimulationApiResponseSchema>;

// =========================================
// 7. Decision Center (Updated for Console)
// =========================================
const DecisionMetricSchema = z.object({
    label: z.string(),
    val: z.string(),
    sign: z.string(),
    unit: z.string(),
});

export const DecisionApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
        description: z.string(),
    }),
    strategies: z.array(z.object({
        id: z.string(),
        label: z.string(),
        icon_key: z.string(),
        is_recommended: z.boolean(),
        status_tag: z.string().optional(),
        // 系统承诺/预演数据
        system_promise: z.object({
            theme_color: z.string(),
            tag: z.string(),
            mode_label: z.string(),
            title: z.string(),
            desc: z.string(),
            metrics: z.object({
                roi: DecisionMetricSchema,
                sales: DecisionMetricSchema,
            })
        }),
    })),
    controls: z.object({
        budget: z.object({
            title: z.string(),
            options: z.array(z.object({ id: z.string(), label: z.string() })),
        }),
        expand: z.object({
            title: z.string(),
            options: z.array(z.object({ id: z.string(), label: z.string() })),
        }),
    }),
    action_button_text: z.string(),
});
export type DecisionApiResponse = z.infer<typeof DecisionApiResponseSchema>;

// =========================================
// 8. Reasoning Framework (API Response)
// =========================================
export const ReasoningFrameworkApiResponseSchema = z.object({
    header: z.object({
        title: z.string(),
        theme_color: z.string(),
    }),
    steps: z.array(z.object({
        step_number: z.string(),
        title: z.string(),
        icon_key: z.string(),
        description_html: z.string(),
    })),
    footer_meta: z.object({
        reasoning_id: z.string(),
        confidence_score: z.string(),
    }),
});
export type ReasoningFrameworkApiResponse = z.infer<typeof ReasoningFrameworkApiResponseSchema>;

// =========================================
// 9. Aggregated Dashboard Type
// =========================================
export type AnalysisDashboardData = {
    heroData: HeroApiResponse | null;
    kpiData: KpiApiResponse | null;
    insightData: InsightApiResponse | null;
    evidenceData: DataEvidenceApiResponse | null;
    coverageData: CoverageApiResponse | null;
    simulationData: SimulationApiResponse | null;
    decisionData: DecisionApiResponse | null;
    reasoningData: ReasoningFrameworkApiResponse | null;
};
