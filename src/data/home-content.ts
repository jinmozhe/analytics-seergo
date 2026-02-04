import type {
    TechItem,
    ComparisonRow,
    ExecutionLog,
    ModelContent,
    ModelTab
} from "@/types/home"; // ✅ Updated Import Path

// 1. Hero 区域技术栈数据
export const TECH_STACK: TechItem[] = [
    { name: 'AI驱动引擎', color: 'text-blue-400', border: 'hover:border-blue-500/50', iconColor: 'bg-blue-500' },
    { name: '量化决策', color: 'text-indigo-400', border: 'hover:border-indigo-500/50', iconColor: 'bg-indigo-500' },
    { name: '强化学习 (RL)', color: 'text-purple-400', border: 'hover:border-purple-500/50', iconColor: 'bg-purple-500' },
    { name: '实时博弈论', color: 'text-orange-400', border: 'hover:border-orange-500/50', iconColor: 'bg-orange-500' },
    { name: '全局归因', color: 'text-emerald-400', border: 'hover:border-emerald-500/50', iconColor: 'bg-emerald-500' },
    { name: '自动执行', color: 'text-cyan-400', border: 'hover:border-cyan-500/50', iconColor: 'bg-cyan-500' }
];

// 2. 对比表格数据
export const COMPARISON_DATA: ComparisonRow[] = [
    {
        dim: '决策依据',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        rule: '死板的“如果-那么”规则',
        human: '个人经验与直觉 (不稳定)',
        seergo: '基于大数据的概率模型与推演',
        highlight: true
    },
    {
        dim: '适应能力',
        iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        rule: '市场变化时规则失效',
        human: '反应慢，需人工复盘',
        seergo: '自进化，随数据积累自动修正策略',
        highlight: true
    },
    {
        dim: '计算维度',
        iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
        rule: '单维度 (仅看ACOS)',
        human: '有限维度 (人脑处理上限)',
        seergo: '全维度 (库存/竞品/利润 联合计算)',
        highlight: true
    },
    {
        dim: '执行效率',
        iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
        rule: '机械执行',
        human: '有情绪，有延迟',
        seergo: '7×24h 毫秒级理性执行',
        highlight: true
    }
];

// 3. 自动化日志 Mock 数据
export const EXECUTION_LOGS: ExecutionLog[] = [
    {
        time: '13:30 PM',
        title: '流量高峰分时调价',
        action: '核心广告组 A 全线关键词出价临时上浮 15%。',
        reason: '进入店铺历史转化高峰时段（13:00-16:00），系统识别到实时流量竞争度增强，需提高竞价获取首屏曝光。',
        expectation: '抢占黄金位流量，预计提升 20% 的点击获取能力，捕捉高意向客群。',
        type: 'success'
    },
    {
        time: '14:45 PM',
        title: '竞品关联位防御',
        action: '在特定 ASIN（竞品 B）的商品详情页广告位增加出价。',
        reason: '监测到该竞品近期提价 $5，我方产品价格优势凸显，属于截流转化的最佳时机。',
        expectation: '吸引竞品潜在客户跳转，预计转化率将比平均水平高出 1.5%。',
        type: 'success'
    },
    {
        time: '16:00 PM',
        title: '异常波动熔断控制',
        action: '暂停广告组 C 的特定长尾词投放。',
        reason: '该词在过去 2 小时内发生异常点击（快速消耗 $30 且无转化），触发系统反欺诈/异常流量保护机制。',
        expectation: '及时止损，防止预算在非真实需求波动中枯竭。',
        type: 'danger'
    },
    {
        time: '17:00 PM',
        title: '低库存策略性减速',
        action: '将每日总预算下调 30%，并关闭部分高消耗广告位。',
        reason: '预测当前动销速度会导致产品在 3 天内断货，需通过降低广告热度延长售卖期，避免断货对 Listing 权重的重创。',
        expectation: '平滑过渡至补货入库，将库容风险降至最低，维持自然排名权重。',
        type: 'warning'
    }
];

// 4. 模型内容配置 (Refactored from Angular switch-case)
// 使用 Record 类型确保 key 必须匹配 ModelTab，防止拼写错误
export const MODELS_DATA: Record<ModelTab, ModelContent> = {
    profit: {
        id: 'profit',
        shortTitle: '利润核算',
        subtitle: 'Profit Analysis',
        fullTitle: '【利润核算模型】(财务)',
        painPoint: '“你以为赚了，其实在亏？”',
        coreFeature: '全自动财务清洗',
        details: [
            '告别Excel手工表。系统自动抓取并拆解销售额、头程、FBA、佣金及退货坏账。',
            '精确到SKU的净利率分析，一眼识别“虚假繁荣”的亏损爆款。'
        ]
    },
    traffic: {
        id: 'traffic',
        shortTitle: '流量效率',
        subtitle: 'Traffic Efficiency',
        fullTitle: '【流量效率模型】(广告)',
        painPoint: '“ACOS降不下来，销量升不上去？”',
        coreFeature: 'ACOS/TACOS 双轨制考核',
        details: [
            '不仅仅是调价。通过A/B测试量化图片点击率，通过搜索词分析量化关键词转化率。',
            '将预算自动从“低效词”搬运至“高效词”，实现ROI最大化。'
        ]
    },
    capital: {
        id: 'capital',
        shortTitle: '资金周转',
        subtitle: 'Capital Turnover',
        fullTitle: '【资金周转模型】(库存)',
        painPoint: '“赚的钱都压在货里了？”',
        coreFeature: '库存周转率与IPI优化',
        details: [
            '根据日均销量 × 备货周期，动态计算补货警戒线。',
            '量化冗余库存的资金占用成本，在仓储费吞噬利润前给出清仓建议。'
        ]
    },
    competition: {
        id: 'competition',
        shortTitle: '竞争博弈',
        subtitle: 'Game Theory',
        fullTitle: '【竞争博弈模型】(市场)',
        painPoint: '“新品一上架就石沉大海？”',
        coreFeature: '成功率预估与竞品解构',
        details: [
            '文本挖掘竞品Review中的高频吐槽点，量化改进方向。',
            '在投入资金前，先跑通利润空间模型，不打无准备之仗。'
        ]
    }
};
