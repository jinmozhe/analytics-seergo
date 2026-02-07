// src/components/report/DataEvidence.tsx
import type { DataEvidenceApiResponse } from "@/types/report";
import { cn } from "@/lib/utils";

interface DataEvidenceProps {
  data: DataEvidenceApiResponse | null;
}

export function DataEvidence({ data }: DataEvidenceProps) {
  if (!data) return <div className="py-20 text-center text-slate-600 animate-pulse">Loading Evidence Data...</div>;

  return (
    <section className="w-full border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] relative z-30">
      <div className="w-full max-w-[1280px] px-0 flex flex-col py-24 md:py-32 mx-auto">
        {/* [修复] 移除 'block'，保留 'flex' 以支持 flex-col 布局 */}
        <div className="relative z-10 flex flex-col justify-center space-y-12 w-full pb-10">
          
          {/* Ambient Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
             <div className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 filter blur-[90px] animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(46, 119, 247, 0.6) 0%, transparent 70%)' }}></div>
             <div className="absolute top-[30%] -right-[15%] w-[500px] h-[500px] rounded-full mix-blend-screen opacity-15 filter blur-[100px] animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)', animationDelay: '3s' }}></div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
               <span className="hero-gradient-text">{data.header.title_highlight}</span>
               <span className="text-white">{data.header.title_suffix}</span>
            </h2>
            <p className="text-slate-600 font-medium uppercase tracking-[0.3em] text-sm md:text-base">
               {data.header.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative z-10">
             
             {/* === CARD 1: Precision Analysis (Multi-segment Bar) === */}
             <div className="glass-card p-8 rounded-3xl flex flex-col h-full relative overflow-hidden group hover:bg-white/[0.02] transition-colors border-t border-white/10">
                <div className="flex justify-between items-start mb-6">
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-wide">{data.precision.title}</h3>
                      <div className="text-xs text-slate-500 font-medium tracking-wide opacity-80">{data.precision.subtitle}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-5xl font-bold text-white tracking-tighter drop-shadow-md">{data.precision.score}</div>
                   </div>
                </div>

                <div className="min-h-[100px] flex flex-col justify-end flex-1 pb-6">
                   {/* Segmented Bar Chart */}
                   <div className="w-full h-14 flex gap-1.5 p-1 bg-[#0B1221] rounded-full border border-white/5 relative">
                      {/* Segment 1: Strong (Blue) */}
                      <div className="h-full bg-[#007AFF] rounded-full flex items-center justify-center relative shadow-[0_0_15px_rgba(0,122,255,0.4)] z-10"
                           style={{ width: `${data.precision.chart.strong_percent}%` }}>
                         <span className="text-sm font-bold text-white">{data.precision.chart.strong_percent}%</span>
                      </div>
                      {/* Segment 2: Weak (Slate) */}
                      <div className="h-full bg-slate-700 rounded-full flex items-center justify-center relative"
                           style={{ width: `${data.precision.chart.weak_percent}%` }}>
                         <span className="text-xs font-bold text-slate-200">{data.precision.chart.weak_percent}%</span>
                      </div>
                      {/* Segment 3: Irrelevant (Striped) */}
                      <div className="h-full flex-1 rounded-full relative bg-[#1E293B]"
                           style={{ 
                               width: `${data.precision.chart.irrelevant_percent}%`,
                               backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgb(51, 65, 85) 4px, rgb(51, 65, 85) 5px)', 
                               opacity: 0.4 
                           }}>
                      </div>
                   </div>

                   {/* Legend */}
                   <div className="flex items-center gap-6 mt-4 pl-1">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] shadow-[0_0_5px_#007AFF]"></div>
                         <span className="text-[10px] text-slate-400 font-medium">强相关</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                         <span className="text-[10px] text-slate-500 font-medium">弱相关</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                         <span className="text-[10px] text-slate-500 font-medium">不相关</span>
                      </div>
                   </div>
                </div>

                {/* Metrics Grid */}
                {/* [修复] 合并重复的 border-white/5 类名，并使用 border-y 简化 */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/5 min-h-[6.5rem]">
                   {data.precision.metrics.map((metric, idx) => (
                       <div key={idx} className={cn("flex flex-col gap-1", idx === 1 && "border-l border-white/5 pl-4")}>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{metric.label}</div>
                          <div className="text-2xl md:text-3xl font-bold text-white font-mono">{metric.value}</div>
                          <div className="text-[10px] text-slate-600">{metric.sub}</div>
                       </div>
                   ))}
                </div>

                {/* Source Note */}
                <div className="flex items-center gap-2 opacity-50 min-h-[20px] mt-3">
                   <svg className="w-3 h-3 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                   </svg>
                   <span className="text-[9px] text-slate-400 font-mono tracking-wide">{data.precision.source_note}</span>
                </div>

                {/* Alert Box */}
                <div className="mt-4 relative">
                   <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 pl-3 border-l-[3px] border-[#FF6F3C] py-0.5">
                         <div className="text-[10px] font-mono font-bold text-[#FF6F3C] tracking-widest uppercase opacity-100 leading-none">{data.precision.alert.title}</div>
                         <div className="text-sm text-slate-300 font-medium leading-snug">{data.precision.alert.message}</div>
                      </div>
                      <div className="text-right">
                         <div className="text-3xl font-bold text-[#FF6F3C] tracking-tight">{data.precision.alert.stat}</div>
                         <div className="text-[9px] text-slate-500 mt-0">{data.precision.alert.stat_label}</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* === CARD 2: Coverage Analysis (20-Bar Chart) === */}
             <div className="glass-card p-8 rounded-3xl flex flex-col h-full relative overflow-hidden group hover:bg-white/[0.02] transition-colors border-t border-white/10">
                <div className="flex justify-between items-start mb-6">
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-wide">{data.coverage.title}</h3>
                      <div className="text-xs text-slate-500 font-medium tracking-wide opacity-80">{data.coverage.subtitle}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-5xl font-bold text-white tracking-tighter drop-shadow-md">{data.coverage.score}</div>
                   </div>
                </div>

                <div className="relative min-h-[100px] flex flex-col justify-end flex-1 pb-6">
                   {/* 20 Bars Chart */}
                   <div className="flex items-end justify-between gap-1.5 h-14 w-full relative">
                      {Array.from({ length: 20 }).map((_, i) => {
                          const totalBars = 20;
                          const activeBars = Math.round((data.coverage.chart_percent / 100) * totalBars);
                          const isActive = i < activeBars;
                          const isMiddleActive = isActive && i === Math.floor(activeBars / 2);

                          return (
                            <div 
                                key={i}
                                className={cn(
                                    "w-full rounded-full transition-all duration-500 relative",
                                    isActive ? "bg-[#3B82F6] shadow-[0_0_6px_rgba(59,130,246,0.6)]" : "bg-slate-800/40"
                                )}
                                style={{ height: "100%" }}
                            >
                                {/* Tooltip on middle active bar */}
                                {isMiddleActive && (
                                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-10">
                                        <div className="bg-white text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                                            已覆盖
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-white rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                                    </div>
                                )}
                            </div>
                          );
                      })}
                   </div>
                   
                   {/* Coverage Legend */}
                   <div className="flex justify-between items-center mt-3 text-[10px] font-medium font-mono uppercase tracking-wider text-slate-500 px-1">
                      <span>0% 覆盖率</span>
                      <span className="text-blue-400 font-bold">当前: {data.coverage.chart_percent}%</span>
                      <span>目标: 100%</span>
                   </div>
                </div>

                {/* Metrics Grid */}
                {/* [修复] 合并重复的 border-white/5 类名，并使用 border-y 简化 */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/5 min-h-[6.5rem]">
                   {data.coverage.metrics.map((metric, idx) => (
                       <div key={idx} className={cn("flex flex-col gap-1", idx === 1 && "border-l border-white/5 pl-4")}>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">{metric.label}</div>
                          <div className="text-2xl md:text-3xl font-bold text-white font-mono">{metric.value}</div>
                          <div className="text-[10px] text-slate-600">{metric.sub}</div>
                       </div>
                   ))}
                </div>

                {/* Source Note */}
                <div className="flex items-center gap-2 opacity-50 min-h-[20px] mt-3">
                   <svg className="w-3 h-3 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>
                   <span className="text-[9px] text-slate-400 font-mono tracking-wide">{data.coverage.source_note}</span>
                </div>

                {/* Alert Box */}
                <div className="mt-4 relative">
                   <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 pl-3 border-l-[3px] border-[#FF6F3C] py-0.5">
                         <div className="text-[10px] font-mono font-bold text-[#FF6F3C] tracking-widest uppercase opacity-100 leading-none">{data.coverage.alert.title}</div>
                         <div className="text-sm text-slate-300 font-medium leading-snug">{data.coverage.alert.message}</div>
                      </div>
                      <div className="text-right">
                         <div className="text-3xl font-bold text-[#FF6F3C] tracking-tight">{data.coverage.alert.stat}</div>
                         <div className="text-[9px] text-slate-500 mt-0">{data.coverage.alert.stat_label}</div>
                      </div>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}
