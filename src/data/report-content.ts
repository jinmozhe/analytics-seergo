import type {
    StrategyOption,
    ControlOption,
    ReportFilter,
    GapCardData,
    SimulationData,
    InsightData
} from "@/types/report";

// =========================================
// 1. Hero Section Data
// =========================================

export const REPORT_FILTERS: ReportFilter[] = [
    { id: 'sp', label: 'SP 产品广告', selected: true },
    { id: 'sb', label: 'SB 品牌广告', selected: true },
    { id: 'sd', label: 'SD 展示型广告', selected: false }
];

// =========================================
// 2. KPI Overview Data
// =========================================

export const KPI_GAP_CARDS: GapCardData[] = [
    {
        id: 'sales-gap',
        title: '销售量 VS TOP1',
        status: '差距扩大',
        statusColor: 'red',
        currentValue: '2,450',
        currentLabel: '我方销量 (42%)',
        targetValue: '5,800',
        targetLabel: 'Top 1 标杆',
        progress: 42,
        alertMessage: '差距 <span class="text-white font-bold">3,350 单</span>，较上周 <span class="text-red-400 font-bold border-b border-red-500/30 pb-0.5">扩大 150 单</span>'
    },
    {
        id: 'roi-gap',
        title: 'ROI VS 目标',
        status: '未达标',
        statusColor: 'orange',
        currentValue: '2.07',
        currentLabel: '/ 3.0 目标', // Combined for simplicity in UI
        targetValue: '3.0',
        targetLabel: '目标',
        progress: 69,
        alertMessage: '达成进度滞后，近7日波动率 <span class="text-orange-400 font-bold border-b border-orange-500/30 pb-0.5">高</span>'
    }
];

export const KPI_METRICS_TOTAL = [
    { label: '总销售额', value: '$42,500' },
    { label: '总花费', value: '$8,200' },
    { label: '总销量', value: '1,240' },
    { label: '整体 ROI', value: '5.18', highlight: true } // highlight for blue color
];

export const KPI_METRICS_AD = [
    { label: '广告销售额', value: '$18,400' },
    { label: '广告花费', value: '$8,200' },
    { label: '广告销量', value: '520' },
    { label: '广告 ROI', value: '2.24', highlight: true } // highlight for orange color
];

// =========================================
// 3. Analyst Insight Data
// =========================================

export const INSIGHT_DATA: InsightData = {
    roi: '2.07',
    summary: '非目标池的宽泛匹配正在吞噬核心利润。竞对在 Top 词并未大幅提价，这是 <span class="border-b border-blue-500 text-white">结构性优化的黄金窗口</span>。',
    analystName: '首席分析师',
    strategies: [
        {
            title: '关停低效词',
            tag: '高优先级',
            desc: 'ROI < 1.0 的 24 个长尾词 (Cost $1,200)',
            priority: 'high'
        },
        {
            title: '否定词添加',
            tag: '立即执行',
            desc: '针对 "Cheap", "Free" 等 5 个高消耗词根',
            priority: 'immediate'
        }
    ]
};

// =========================================
// 4. Coverage & Precision Data (Simplified)
// =========================================

export const COVERAGE_DATA = {
    percentage: 45,
    label: '白名单覆盖度',
    revenue: '$3,420',
    bars: [
        { label: '直接竞争', sub: '高相关性', value: 60, color: 'bg-[#007AFF]' },
        { label: '功能可替代', sub: '中等', value: 25, color: 'bg-slate-500' },
        { label: '不相关 / 其他', sub: '低', value: 15, color: 'bg-slate-800' }
    ]
};

// =========================================
// 5. AI Simulation Data
// =========================================

export const SIMULATION_DATA: SimulationData = {
    currentRoi: '1.86',
    currentGap: '-24%',
    currentSales: '$224,800',
    currentSpend: '$120,400',

    predictedRoi: '2.45',
    predictedGrowth: '+31.7%',

    optimizedSpend: '$108,000',
    optimizedSpendChange: '-10.3%',

    predictedSales: '$264,600',
    predictedSalesChange: '+17.7%',

    confidence: '94.8%'
};

// =========================================
// 6. Decision Console Data
// =========================================

export const STRATEGY_OPTIONS: StrategyOption[] = [
    {
        id: 'roi',
        label: 'ROI 达标优先',
        modeLabel: '安全模式',
        desc: '清理低效投放，锁定利润底线，确保整体ROI稳步达标。',
        isRecommended: true
    },
    {
        id: 'sales',
        label: '销量追赶 TOP1',
        modeLabel: '激进模式',
        desc: '放宽ROI约束，集中预算抢占流量，高速拉升销量与市场份额。'
    },
    {
        id: 'balance',
        label: '稳健平衡',
        modeLabel: '平衡模式',
        desc: '设定保本ROI底线，分层迁移预算扩量，兼顾销量与利润效益。'
    }
];

export const BUDGET_OPTIONS: ControlOption[] = [
    { id: 'inc', label: '+20%' },
    { id: 'hold', label: '持平 (Hold)' },
    { id: 'dec', label: '-15%' }
];

export const EXPAND_OPTIONS: ControlOption[] = [
    { id: 'asin', label: 'ASIN 白名单' },
    { id: 'kw', label: '关键词扩容' },
    { id: 'structure', label: '结构清理优先' }
];
