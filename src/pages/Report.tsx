import { ReportHero } from "@/components/report/ReportHero";
import { KpiOverview } from "@/components/report/KpiOverview";
import { AnalystInsight } from "@/components/report/AnalystInsight";
import { CoveragePrecision } from "@/components/report/CoveragePrecision";
import { AiSimulation } from "@/components/report/AiSimulation";
import { DecisionConsole } from "@/components/report/DecisionConsole";

export default function Report() {
  return (
    // 使用 flex-col 布局，并确保整体背景色与全局一致 (由 index.css 中的 .dark --background 控制)
    <div className="flex flex-col w-full min-h-screen">
      
      {/* 1. Hero Section 
        -mt-24 是为了抵消 MainLayout 的 pt-24，使 Hero 背景能够延伸到顶部导航栏下方，
        实现沉浸式全屏效果。
      */}
      <div className="-mt-24 relative z-40">
        <ReportHero />
      </div>

      {/* 2. Core KPI Overview */}
      <div className="relative z-30">
        <KpiOverview />
      </div>

      {/* 3. Analyst Insights */}
      <div className="relative z-30">
        <AnalystInsight />
      </div>

      {/* 4. Coverage & Precision */}
      <div className="relative z-30">
        <CoveragePrecision />
      </div>

      {/* 5. AI Simulation */}
      <div className="relative z-30">
        <AiSimulation />
      </div>

      {/* 6. Decision Console */}
      <div className="relative z-30 mb-20">
        <DecisionConsole />
      </div>

    </div>
  );
}
