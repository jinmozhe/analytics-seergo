// src/pages/Report.tsx
import { useLayoutEffect } from "react"; // [新增]
import { useLoaderData } from "react-router-dom";
import { ReportHero } from "@/components/report/ReportHero";
import { KpiOverview } from "@/components/report/KpiOverview";
import { AnalystInsight } from "@/components/report/AnalystInsight";
import { DataEvidence } from "@/components/report/DataEvidence"; 
import { AiSimulation } from "@/components/report/AiSimulation";
import { DecisionConsole } from "@/components/report/DecisionConsole";
import type { AnalysisDashboardData } from "@/types/report";

import "./Report.css";

export default function Report() {
  const { 
    heroData, 
    kpiData, 
    insightData, 
    evidenceData,
    simulationData, 
    decisionData,
  } = useLoaderData() as AnalysisDashboardData;

  // [核心修复] 使用 useLayoutEffect 锁定根字号
  // 这会在浏览器 Paint 之前执行，用户绝对看不到 16px -> 14px 的跳变
  useLayoutEffect(() => {
    // 1. 强制锁定 HTML 字号为 14px
    document.documentElement.style.fontSize = "14px";
    document.documentElement.style.scrollBehavior = "smooth";

    // 2. 清理函数：离开页面时恢复默认 (通常是 16px 或空)
    return () => {
      document.documentElement.style.fontSize = ""; 
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div id="report-page-scope" className="flex flex-col w-full min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 relative">
      
      {/* 全局雾气背景 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020617] opacity-30 mix-blend-overlay pointer-events-none"></div>
      </div>

      <div className="-mt-24 relative z-40 w-full max-w-[1064px] mx-auto px-8 pb-32 md:pb-48">
        <ReportHero data={heroData} />
      </div>
      
      <KpiOverview data={kpiData} />

      <AnalystInsight data={insightData} />

      <DataEvidence data={evidenceData} />

      <AiSimulation data={simulationData} />

      <DecisionConsole data={decisionData} />

    </div>
  );
}
