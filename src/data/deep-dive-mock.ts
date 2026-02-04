// ✅ Fix: Add 'type' keyword for interfaces/types
import type { TimeOption, CategoryOption, ReportDetailOption, ReportType, DataPreviewMetrics, ChatMessage } from "@/types/deep-dive";

// ... (Rest of the file content remains exactly the same as before)
// ... (Make sure the content I gave you in the previous step is still here)

// Re-pasting the content just to be safe and ensure full file correctness:
export const TIME_OPTIONS: TimeOption[] = [
    { id: 'w0', label: '本周', dateRange: '01/22 - 01/28' },
    { id: 'w1', label: '上周', dateRange: '01/15 - 01/21' },
    { id: 'w2', label: 'W2', dateRange: '01/08 - 01/14' },
    { id: 'w3', label: 'W1', dateRange: '01/01 - 01/07' },
];

export const CATEGORY_OPTIONS: CategoryOption[] = [
    { id: 'diagnosis', label: '诊断报告' },
    { id: 'performance', label: '效果报告' },
];

export const DETAIL_OPTIONS: ReportDetailOption[] = [
    { id: 'comprehensive', label: '综合', broadType: 'sp' },
    { id: 'sp-asin', label: 'SP ASIN', broadType: 'sp' },
    { id: 'sp-kw', label: 'SP 关键词', broadType: 'sp' },
    { id: 'sb-asin', label: 'SB ASIN', broadType: 'sb' },
    { id: 'sb-video', label: 'SB 视频', broadType: 'sb' },
    { id: 'sb-kw', label: 'SB 关键词', broadType: 'sb' },
    { id: 'sd-audience', label: 'SD 人群', broadType: 'sd' },
    { id: 'sd-other', label: 'SD 其他', broadType: 'sd' },
];

export const MOCK_METRICS: Record<ReportType, DataPreviewMetrics> = {
    sp: {
        totalSpend: '$8,240',
        totalSales: '$42,100',
        acos: '19.5%',
        roas: '5.11',
        impressions: '1.2M',
        clicks: '14.5K',
        ctr: '1.2%',
        cpc: '$0.57'
    },
    sb: {
        totalSpend: '$3,100',
        totalSales: '$18,600',
        acos: '16.7%',
        roas: '6.00',
        impressions: '850K',
        clicks: '9.2K',
        ctr: '1.08%',
        cpc: '$0.34'
    },
    sd: {
        totalSpend: '$1,500',
        totalSales: '$4,200',
        acos: '35.7%',
        roas: '2.80',
        impressions: '2.4M',
        clicks: '5.1K',
        ctr: '0.21%',
        cpc: '$0.29'
    }
};

export const REPORT_SUMMARIES: Record<ReportType, string> = {
    sp: "SP 报告显示核心大词竞争加剧，Top 3 关键词 CPC 上涨 15%。建议排查 'Running Shoes' 下的长尾词转化率。",
    sb: "SB 品牌广告表现优异，视频广告 (VSA) 点击率突破 1.5%。建议增加品牌防御预算。",
    sd: "SD 展示型广告受众覆盖广泛，但转化偏低。建议优化再营销 (Remarketing) 的回溯周期设置。"
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
    {
        id: 'intro-1',
        role: 'model',
        text: `### 👋 欢迎进入 Deep Dive 深度分析终端
    
我是您的 **SeerGo AI 分析师**。已成功挂载数据层，当前检测到您正在关注 **SP 产品广告** 报告。

您可以要求我：
- 📉 **归因分析**：查明 ACOS 波动原因
- 🔍 **异常检测**：找出高花费低产出的“大词”
- 💡 **策略生成**：基于当前数据生成竞价调整方案

请问您想先从哪里开始？`,
        timestamp: Date.now()
    }
];

export const SUGGESTED_PROMPTS = [
    "分析本周 ACOS 上涨的主要原因",
    "找出花费 Top 10 但 ROAS < 2 的关键词",
    "如何优化 'Running Shoes' 的竞价策略？",
    "生成一份下周的预算分配建议"
];


// ... (保留文件上方原有的所有 imports 和常量: TIME_OPTIONS, CATEGORY_OPTIONS, DETAIL_OPTIONS, MOCK_METRICS, REPORT_SUMMARIES, INITIAL_CHAT_MESSAGES, SUGGESTED_PROMPTS)

// =========================================
// 6. Full Markdown Test Payload
// =========================================
export const MOCK_FULL_MARKDOWN_RESPONSE = `
# 🧪 Markdown 渲染测试报告 (H1)

这里展示了 **SeerGo AI 终端** 支持的所有富文本格式。用于验证生产环境的渲染能力。

## 1. 核心数据表格 (Tables)

| 维度 (Dimension) | ACOS | ROAS | 趋势 (Trend) | 建议 |
| :--- | :---: | :---: | :---: | :--- |
| **SP 关键词** | 19.5% | 5.11 | <span style="color:#ef4444">↑ 2.1%</span> | 🔴 需优化 |
| **SB 视频广告** | 15.2% | 6.40 | <span style="color:#10b981">↓ 1.5%</span> | 🟢 扩量 |
| **SD 再营销** | 28.4% | 3.10 | ─ 0.0% | 🟡 观察 |

---

## 2. 代码高亮 (Code Blocks)

**Python 数据分析脚本：**
\`\`\`python
def calculate_break_even_acos(profit_margin):
    """
    计算盈亏平衡 ACOS
    """
    if profit_margin <= 0:
        return 0
    return profit_margin * 0.85  # 预留 15% 缓冲
    
current_margin = 0.35
target_acos = calculate_break_even_acos(current_margin)
print(f"Target ACOS: {target_acos:.2%}")
\`\`\`

**JSON 数据结构：**
\`\`\`json
{
  "campaign_id": "SP_001",
  "status": "ENABLED",
  "daily_budget": 50.00,
  "tags": ["high-roas", "core-keywords"]
}
\`\`\`

---

## 3. 文本样式与列表

### 样式展示
- **加粗文本 (Bold)**：强调核心结论。
- *斜体文本 (Italic)*：用于补充说明。
- ~~删除线 (Strikethrough)~~：用于标记已废弃的策略。
- \`行内代码 (Inline Code)\`：如 \`camp_id\` 字段。
- [链接跳转 (Link)](https://www.google.com)：查看外部数据源。

### 任务清单 (Task List)
- [x] ✅ **已完成**：下载 Q1 报表
- [x] ✅ **已完成**：分析 Top 10 亏损词
- [ ] ⬜ **待处理**：调整 "Running Shoes" 竞价
- [ ] ⬜ **待处理**：新建 SB 视频广告组

### 引用块 (Blockquotes)
> 💡 **分析师洞察**：
> 
> 虽然整体 ROAS 达标，但在 *移动端* 的转化率比上周下降了 **15%**。
> 建议检查移动端详情页的主图清晰度。

---

## 4. 数学公式 (Math / LaTeX)
*(注：需配置 Remark Math 插件方可渲染公式，否则显示为源码)*

**行内公式**：效率公式 $E = mc^2$
**块级公式**：
$$
ROAS = \\frac{\\text{Total Sales}}{\\text{Total Spend}} \\times 100\\%
$$
`;
