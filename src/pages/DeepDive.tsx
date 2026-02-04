import { useState } from "react";
import { Navbar } from "@/components/home/Navbar";
import { DeepDiveConfig } from "@/components/deep-dive/DeepDiveConfig";
import { DeepDiveChat } from "@/components/deep-dive/DeepDiveChat";
import { DETAIL_OPTIONS } from "@/data/deep-dive-mock";
import type { DeepDiveState, BroadReportType } from "@/types/deep-dive";

export default function DeepDive() {
  // Initialize State with defaults
  const [configState, setConfigState] = useState<DeepDiveState>({
    timeId: 'w0',         // Default: Current Week
    categoryId: 'diagnosis', // Default: Diagnosis
    detailId: 'comprehensive' // Default: Comprehensive
  });

  // Derived state for AI Context (Mapping the specific detail back to SP/SB/SD)
  const activeBroadType: BroadReportType = DETAIL_OPTIONS.find(
    opt => opt.id === configState.detailId
  )?.broadType || 'sp';

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-1 flex flex-col w-full max-w-[1800px] mx-auto px-4 md:px-6 pt-24 pb-6 relative z-10">
        
        {/* Header */}
        <div className="mb-8 space-y-2 px-2 animate-fade-in-down">
           <div className="flex items-center gap-3 opacity-70">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">/ DEEP-DIVE ANALYSIS</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="text-white">全维数据</span>
              <span className="text-slate-500 mx-3">/</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">深度探索</span>
           </h1>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col xl:flex-row gap-8 h-full min-h-[600px]">
           
           {/* LEFT COLUMN: Configuration (Wider now due to grid) */}
           <div className="w-full xl:w-[600px] shrink-0 flex flex-col h-full">
              <DeepDiveConfig 
                state={configState} 
                onChange={setConfigState} 
              />
           </div>

           {/* RIGHT COLUMN: AI Chat Terminal */}
           <div className="flex-1 h-full min-h-[600px]">
              {/* Pass the derived broad type so Chat logic still works */}
              <DeepDiveChat activeType={activeBroadType} />
           </div>

        </div>

      </main>
    </div>
  );
}
