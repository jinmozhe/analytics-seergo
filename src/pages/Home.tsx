// src/pages/Home.tsx
import { useLoaderData } from "react-router-dom";
import { HeroSection } from "@/components/home/HeroSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { ModelsDashboard } from "@/components/home/ModelsDashboard";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { ComparisonSection } from "@/components/home/ComparisonSection";
// 1. 引入新组件
import { FinalCTASection } from "@/components/home/FinalCTASection"; 
import type { HomeDashboardData } from "@/types/home";
// [关键变更] 引入首页专属样式，隔离 index.css 污染
import "./Home.css";

export default function Home() {
  const {
    heroData,
    resultsData,
    modelsData,
    processData,
    comparisonData,
    finalCTAData // 2. 获取数据
  } = useLoaderData() as HomeDashboardData;

  return (
    // ✅ 显式锁定背景色为 #010409，防止受全局 Report 主题色 (#020617) 影响
    // ✅ 添加 min-h-screen 和 w-full 确保覆盖完整
    <div className="bg-[#010409] min-h-screen w-full -mt-24 pt-24">
      
      {/* 2. 核心视觉区 (Fluid Orbs) */}
      <div className="-mt-24"> 
        <HeroSection data={heroData} />
      </div>

      {/* 3. 三张清单 (Cards & Infinite Scroll) */}
      <ResultsSection data={resultsData} />

      {/* 4. 全息模型控制台 (Tabs & Visuals) */}
      <ModelsDashboard data={modelsData} />

      {/* 5. 流程图 (Liquid Pipe) */}
      <ProcessFlow data={processData} />

      {/* 6. 对比表格 (Table) */}
      <ComparisonSection data={comparisonData} />

      {/* 7. Final CTA Section (封装后的组件) */}
      <FinalCTASection data={finalCTAData} />

    </div>
  );
}
