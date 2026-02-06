// src/types/report.ts
import { z } from "zod";

// =========================================
// 1. Report Hero (API Response)
// =========================================
export const HeroApiResponseSchema = z.object({
    eyebrow_text: z.string(),
    main_title_line_1: z.string(),
    main_title_line_2: z.string(),
    subtitle_prefix: z.string(),
    subtitle_suffix: z.string(),
    description: z.string(),
    action_cards: z.array(z.object({
        id: z.string(),
        type: z.string(),
        title: z.string(),
        subtitle: z.string(),
        link_target: z.string(),
        theme_color: z.string(),
    })),
    footer_validation_text: z.string(),
});
export type HeroApiResponse = z.infer<typeof HeroApiResponseSchema>;

// =========================================
// 2. KPI Metrics (API Response)
// =========================================
export const KpiApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
    }),
    gap_cards: z.array(z.object({
        id: z.string(),
        title: z.string(),
        status_label: z.string(),
        status_color: z.enum(["red", "orange"]),
        current_value: z.string(),
        current_label: z.string(),
        target_value: z.string(),
        target_label: z.string(),
        progress_percent: z.number(),
        alert_html: z.string(),
    })),
    metric_sections: z.array(z.object({
        id: z.string(),
        title: z.string(),
        theme_color: z.string(),
        items: z.array(z.object({
            label: z.string(),
            value: z.string(),
            highlight: z.boolean(),
        })),
    })),
});
export type KpiApiResponse = z.infer<typeof KpiApiResponseSchema>;

// =========================================
// 3. Analyst Insights (API Response)
// =========================================
export const InsightApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
    }),
    summary_card: z.object({
        title: z.string(),
        roi_display: z.string(),
        content_html: z.string(),
        analyst_info: z.object({
            name: z.string(),
            status_html: z.string(),
        }),
    }),
    strategy_card: z.object({
        main_title: z.string(),
        strategy_name: z.string(),
        strategy_en: z.string(),
        list_title: z.string(),
        list_items: z.array(z.object({
            title: z.string(),
            tag: z.string(),
            desc: z.string(),
        })),
    }),
});
export type InsightApiResponse = z.infer<typeof InsightApiResponseSchema>;

// =========================================
// 4. Coverage & Precision (API Response)
// =========================================
export const CoverageApiResponseSchema = z.object({
    header: z.object({
        title_highlight: z.string(),
        title_suffix: z.string(),
        subtitle: z.string(),
    }),
    coverage_section: z.object({
        step_label: z.string(),
        main_title: z.string(),
        chart_percent: z.number(),
        metrics: z.array(z.object({
            label: z.string(),
            value: z.string(),
            sub_label: z.string().optional(),
        })),
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
            sub: z.string(),
            value: z.number(),
            color_class: z.string(),
        })),
        footer_note: z.string(),
    }),
});
export type CoverageApiResponse = z.infer<typeof CoverageApiResponseSchema>;

// =========================================
// 5. AI Revenue Simulation (API Response)
// =========================================
export const SimulationApiResponseSchema = z.object({
    header: z.object({
        title_prefix: z.string(),
        title_highlight: z.string(),
        subtitle: z.string(),
        description: z.string(),
        confidence_html: z.string(),
    }),
    current_diagnosis_card: z.object({
        title: z.string(),
        tag_label: z.string(),
        metrics: z.object({
            roi_label: z.string(),
            roi_value: z.string(),
            roi_gap_label: z.string(),
            sales_label: z.string(),
            sales_value: z.string(),
            spend_label: z.string(),
            spend_value: z.string(),
        }),
        analysis_html: z.string(),
    }),
    simulation_card: z.object({
        title: z.string(),
        subtitle: z.string(),
        status_label: z.string(),
        strategy_tag: z.string(),
        metrics: z.object({
            roi_label: z.string(),
            roi_value: z.string(),
            growth_value: z.string(),
            growth_label: z.string(),
            spend_label: z.string(),
            spend_value: z.string(),
            spend_change: z.string(),
            sales_label: z.string(),
            sales_value: z.string(),
            sales_change: z.string(),
        }),
        conclusion_html: z.string(),
    }),
    footer_note: z.string(),
});
export type SimulationApiResponse = z.infer<typeof SimulationApiResponseSchema>;

// =========================================
// 6. Decision Center (API Response)
// =========================================
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
        desc: z.string(),
        is_recommended: z.boolean(),
        system_promise: z.object({
            title_html: z.string(),
            subtitle_html: z.string(),
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
// 7. Aggregated Dashboard Type
// =========================================
export type AnalysisDashboardData = {
    heroData: HeroApiResponse | null;
    kpiData: KpiApiResponse | null;
    insightData: InsightApiResponse | null;
    coverageData: CoverageApiResponse | null;
    simulationData: SimulationApiResponse | null;
    decisionData: DecisionApiResponse | null;
};
