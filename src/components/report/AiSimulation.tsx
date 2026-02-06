// src/components/report/AiSimulation.tsx
import type { SimulationApiResponse } from "@/types/analysis";

interface AiSimulationProps {
  data: SimulationApiResponse | null;
}

export function AiSimulation({ data }: AiSimulationProps) {
  if (!data) return <div className="py-20 text-center text-slate-600">Loading Simulation...</div>;

  return (
    <section className="relative block w-full py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center overflow-hidden">
      
      <div className="flex flex-col h-full justify-center space-y-6 md:space-y-10 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6">
          <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold">
              <span className="text-white">{data.header.title_prefix} </span>
              <span className="text-gradient-report">{data.header.title_highlight}</span>
              </h2>
              <p className="text-slate-600 uppercase tracking-widest text-[10px]">{data.header.subtitle}</p>
          </div>
          <div className="text-slate-400 text-xs md:text-base font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            <p>{data.header.description}</p>
            <p className="mt-1" dangerouslySetInnerHTML={{ __html: data.header.confidence_html }}></p>
          </div>
        </div>
        
        {/* Split Cards Layout */}
        <div className="w-full relative">
           {/* ARROW (Decoration) */}
           <div className="hidden md:flex absolute left-[33.333333%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group/connector cursor-pointer">
              {/* ... (箭头图标 SVG 保持不变) ... */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover/connector:bg-blue-400/50 transition-all duration-500 animate-pulse-slow"></div>
              <div className="relative w-14 h-14 rounded-full bg-[#0A1025] border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover/connector:border-blue-400 group-hover/connector:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover/connector:scale-110 transition-all duration-300 ease-out">
                 <svg className="w-6 h-6 text-slate-400 group-hover/connector:text-white group-hover/connector:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">

              {/* LEFT CARD: Current Diagnosis */}
              <div className="col-span-1 md:col-span-4 p-6 md:p-10 rounded-3xl border border-white/5 bg-[#050A18] flex flex-col justify-between relative group shadow-lg">
                 <div className="flex justify-between items-start mb-6 md:mb-10">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                       <span className="text-xs md:text-sm font-bold text-slate-300 tracking-wide">{data.current_diagnosis_card.title}</span>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 tracking-wider uppercase">{data.current_diagnosis_card.tag_label}</div>
                 </div>
                 <div className="mb-8 md:mb-12">
                    <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">{data.current_diagnosis_card.metrics.roi_label}</div>
                    <div className="flex items-center gap-3">
                       <span className="text-4xl md:text-5xl font-mono text-slate-200 font-bold tracking-tighter">{data.current_diagnosis_card.metrics.roi_value}</span>
                       <span className="px-2 py-1 bg-red-500/10 rounded text-[10px] font-bold text-red-400 border border-red-500/20 whitespace-nowrap">{data.current_diagnosis_card.metrics.roi_gap_label}</span>
                    </div>
                 </div>
                 {/* Aux Metrics */}
                 <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                    <div>
                       <div className="text-[9px] md:text-[10px] text-slate-500 mb-1 uppercase tracking-wide">{data.current_diagnosis_card.metrics.sales_label}</div>
                       <div className="text-base md:text-lg font-mono text-slate-300 font-medium">{data.current_diagnosis_card.metrics.sales_value}</div>
                    </div>
                    <div>
                       <div className="text-[9px] md:text-[10px] text-slate-500 mb-1 uppercase tracking-wide">{data.current_diagnosis_card.metrics.spend_label}</div>
                       <div className="text-base md:text-lg font-mono text-slate-300 font-medium">{data.current_diagnosis_card.metrics.spend_value}</div>
                    </div>
                 </div>
                 <div className="pl-4 border-l-2 border-red-500/30">
                    <p className="text-xs text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.current_diagnosis_card.analysis_html }}></p>
                 </div>
              </div>

              {/* RIGHT CARD: Simulation */}
              <div className="col-span-1 md:col-span-8 p-6 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 group/card bg-gradient-to-br from-[#1e3a8a]/20 via-[#0f172a]/80 to-[#020617] backdrop-blur-md border border-[#2E77F7]/20">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover/card:bg-blue-400/20 transition-all duration-700"></div>

                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-10 relative z-10">
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                          <h3 className="text-base md:text-lg font-bold text-white tracking-wide">{data.simulation_card.title} <span className="text-slate-400 font-normal text-sm ml-1">{data.simulation_card.subtitle}</span></h3>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium tracking-wide">{data.simulation_card.status_label}</span>
                       </div>
                    </div>
                    <button className="px-4 py-2 bg-[#2E77F7]/10 border border-[#2E77F7]/50 text-[#2E77F7] text-xs font-bold rounded-lg cursor-pointer">{data.simulation_card.strategy_tag}</button>
                 </div>

                 <div className="mb-8 md:mb-12 relative z-10">
                    <div className="text-sm text-blue-200/70 mb-2 uppercase tracking-wider font-bold">{data.simulation_card.metrics.roi_label}</div>
                    <div className="flex items-end gap-4 md:gap-6">
                       <span className="text-5xl md:text-7xl font-mono text-white font-bold tracking-tighter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{data.simulation_card.metrics.roi_value}</span>
                       <div className="flex flex-col justify-end pb-2 md:pb-3 space-y-1">
                          <div className="flex items-center gap-1 text-emerald-400">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                             <span className="text-xl md:text-2xl font-bold tracking-tight">{data.simulation_card.metrics.growth_value}</span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium">{data.simulation_card.metrics.growth_label}</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mb-8 md:mb-12 relative z-10 w-full md:w-3/4">
                    <div className="bg-white/5 p-3 rounded-xl md:bg-transparent md:p-0">
                       <div className="text-xs text-blue-200/50 mb-1 uppercase tracking-wide">{data.simulation_card.metrics.spend_label}</div>
                       <div className="flex items-center gap-3">
                          <span className="text-xl md:text-2xl font-mono text-white font-bold">{data.simulation_card.metrics.spend_value}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 whitespace-nowrap">{data.simulation_card.metrics.spend_change}</span>
                       </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl md:bg-transparent md:p-0">
                       <div className="text-xs text-blue-200/50 mb-1 uppercase tracking-wide">{data.simulation_card.metrics.sales_label}</div>
                       <div className="flex items-center gap-3">
                          <span className="text-xl md:text-2xl font-mono text-white font-bold">{data.simulation_card.metrics.sales_value}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 whitespace-nowrap">{data.simulation_card.metrics.sales_change}</span>
                       </div>
                    </div>
                 </div>

                 <div className="pl-4 border-l-2 border-[#2E77F7] relative z-10">
                    <p className="text-sm text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.simulation_card.conclusion_html }}></p>
                 </div>
              </div>
           </div>
           
           <div className="mt-4 flex justify-end px-2">
              <p className="text-[10px] text-slate-600 font-mono">{data.footer_note}</p>
           </div>
        </div>
      </div>
    </section>
  );
}
