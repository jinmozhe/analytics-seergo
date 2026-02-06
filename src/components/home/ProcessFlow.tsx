// src/components/home/ProcessFlow.tsx
import type { HomeProcessData } from "@/types/home";

interface ProcessFlowProps {
  data: HomeProcessData | null;
}

export function ProcessFlow({ data }: ProcessFlowProps) {
  if (!data) return <div className="py-24 text-center text-slate-600">Loading Process Flow...</div>;

  const { header, stages } = data;

  // 辅助函数：根据 icon_key 渲染对应的 SVG (精确还原原版图标)
  const renderIcon = (key: string) => {
    switch (key) {
      case "data_insight": // Stage 1 Icon (Data/Document)
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "rl_core": // Stage 2 Icon (Chip/Brain)
        return (
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case "auto_exec": // Stage 3 Icon (Lightning)
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-32 bg-[#010409] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* --- Header --- */}
         <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide text-center leading-tight">
            <span className="text-white">{header.title_prefix}</span>
            <span className="text-gradient-custom">&nbsp;{header.title_highlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            {header.description}
          </p>
        </div>
    
        {/* --- The Liquid Flow Container --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
           
           {/* Connecting Pipe Background (Desktop Only) */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0">
              {/* Animated Pulse in the Pipe */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm flow-line"></div>
           </div>
    
           {/* --- Stage 1: Input (Data Ingestion) --- */}
           {/* 使用 stages[0] 确保数据存在 */}
           {stages[0] && (
           <div className="relative z-10 group">
              <div className="mx-auto w-full max-w-sm bg-[#050a18] rounded-2xl p-8 border border-white/5 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,122,255,0.2)] hover:border-blue-500/30">
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#010409] border-2 border-blue-600 flex items-center justify-center z-20">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {renderIcon(stages[0].icon_key)}
                     </div>
                     <h3 className="text-xl font-bold text-white">{stages[0].title}</h3>
                     <p className="text-xs text-blue-500/60 font-mono mt-2">{stages[0].subtitle}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center">
                     <p>{stages[0].desc_top}</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-3"></div>
                     <p className="text-white">{stages[0].desc_bottom}</p>
                  </div>
              </div>
           </div>
           )}
    
           {/* --- Stage 2: Core (RL Core Engine) - Highlighted --- */}
           {/* 此模块保留原有的 md:-mt-8 和 scale-105 特殊样式 */}
           {stages[1] && (
           <div className="relative z-10 group md:-mt-8"> {/* Lifted up on desktop */}
              <div className="mx-auto w-full max-w-sm bg-[#0a0f1e] rounded-2xl p-10 border border-purple-500/30 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] hover:border-purple-500/60 scale-105">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-purple-500/5 rounded-2xl blur-xl group-hover:bg-purple-500/10 transition-all"></div>
                  
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#010409] border-2 border-purple-500 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                     <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6 relative">
                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 text-purple-400 mb-4 group-hover:rotate-180 transition-transform duration-700">
                        {renderIcon(stages[1].icon_key)}
                     </div>
                     <h3 className="text-2xl font-bold text-white">{stages[1].title}</h3>
                     <p className="text-xs text-purple-500/60 font-mono mt-2">{stages[1].subtitle}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center relative">
                     <p className="italic text-purple-200">{stages[1].desc_top}</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-3"></div>
                     <p className="text-white font-bold">{stages[1].desc_bottom}</p>
                  </div>
              </div>
           </div>
           )}
    
           {/* --- Stage 3: Output (Auto Execution) --- */}
           {stages[2] && (
           <div className="relative z-10 group">
              <div className="mx-auto w-full max-w-sm bg-[#050a18] rounded-2xl p-8 border border-white/5 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] hover:border-orange-500/30">
                  {/* Top Node Connection */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#010409] border-2 border-orange-600 flex items-center justify-center z-20">
                     <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  </div>
    
                  <div className="text-center mb-6">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {renderIcon(stages[2].icon_key)}
                     </div>
                     <h3 className="text-xl font-bold text-white">{stages[2].title}</h3>
                     <p className="text-xs text-orange-500/60 font-mono mt-2">{stages[2].subtitle}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-slate-400 text-center">
                     <p>{stages[2].desc_top}</p>
                     <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-3"></div>
                     <p className="text-white">{stages[2].desc_bottom}</p>
                  </div>
              </div>
           </div>
           )}
    
        </div>
      </div>
    </section>
  );
}
