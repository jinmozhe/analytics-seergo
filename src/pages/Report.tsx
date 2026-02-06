// src/pages/Report.tsx
import { useLoaderData } from "react-router-dom";
import { ReportHero } from "@/components/report/ReportHero";
import { KpiOverview } from "@/components/report/KpiOverview";
import { AnalystInsight } from "@/components/report/AnalystInsight";
import { CoveragePrecision } from "@/components/report/CoveragePrecision";
import { AiSimulation } from "@/components/report/AiSimulation";
import { DecisionConsole } from "@/components/report/DecisionConsole";
import type { AnalysisDashboardData } from "@/types/analysis";

export default function Report() {
  // 1. 获取 Loader 返回的完整数据
  const { 
    heroData, 
    kpiData, 
    insightData, 
    coverageData, 
    simulationData, 
    decisionData 
  } = useLoaderData() as AnalysisDashboardData;

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="-mt-24 relative z-40">
        <ReportHero data={heroData} />
      </div>

      {/* 2. Core KPI Overview */}
      <div className="relative z-30">
        <KpiOverview data={kpiData} />
      </div>

      {/* 3. Analyst Insights */}
      <div className="relative z-30">
        <AnalystInsight data={insightData} />
      </div>

      {/* 4. Coverage & Precision */}
      <div className="relative z-30">
        <CoveragePrecision data={coverageData} />
      </div>

      {/* 5. AI Simulation */}
      <div className="relative z-30">
        <AiSimulation data={simulationData} />
      </div>

      {/* 6. Decision Console */}
      <div className="relative z-30 mb-20">
        <DecisionConsole data={decisionData} />
      </div>

    </div>
  );
}
