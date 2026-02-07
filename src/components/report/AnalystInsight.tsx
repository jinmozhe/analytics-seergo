// src/components/report/AnalystInsight.tsx
import React from "react"; // [修复] 引入 React 以支持 JSX 类型命名空间
import type { InsightApiResponse } from "@/types/report";
import { cn } from "@/lib/utils";

interface AnalystInsightProps {
  data: InsightApiResponse | null;
}

// SVG Icon Helper
// [修复] 使用 React.JSX.Element 替代 JSX.Element 以确保类型安全
const ICON_MAP: Record<string, React.JSX.Element> = {
    "x-circle": (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
        </svg>
    ),
    "filter": (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
    ),
    "arrow-switch": (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
        </svg>
    ),
    "building": (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
    ),
    "default": (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    )
};

export function AnalystInsight({ data }: AnalystInsightProps) {
  if (!data) return <div className="py-20 text-center text-slate-600 animate-pulse">Loading Insights...</div>;

  return (
    <section className="w-full border-t border-white/10 relative z-30">
      {/* Top Gradient Separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70"></div>
      
      <div className="w-full max-w-[1280px] px-0 flex flex-col py-24 md:py-32 mx-auto">
        <div className="block relative">
          
          {/* Ambient Background Spheres */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
             <div className="absolute -top-[5%] left-[5%] w-[600px] h-[600px] rounded-full mix-blend-screen opacity-10 filter blur-[100px] animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)', animationDelay: '3s' }}>
             </div>
             <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-screen opacity-10 filter blur-[100px] animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}>
             </div>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-center pb-10 w-full px-4 md:px-0">
            
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                 <span className="text-white">{data.header.title_prefix} </span>
                 <span className="hero-gradient-text">{data.header.title_highlight}</span>
              </h2>
              <p className="text-slate-600 font-medium uppercase tracking-[0.3em] text-sm md:text-base">
                 {data.header.subtitle}
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              
              {/* === LEFT COLUMN: Summary Card === */}
              <div className="lg:col-span-7 bg-[#0B1221]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col relative overflow-hidden group">
                 
                 {/* Noise Texture & Top Border */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/50 via-red-500/50 to-transparent opacity-50"></div>
                 
                 <div className="mb-10 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                          {data.summary_card.tag}
                       </span>
                       <div className="h-px w-12 bg-red-500/20"></div>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-2">
                       {data.summary_card.title_main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">{data.summary_card.title_highlight}</span>
                    </h3>
                 </div>

                 <div className="space-y-8 relative z-10 flex-1">
                    <p 
                        className="text-xl md:text-2xl font-light leading-relaxed text-slate-300"
                        dangerouslySetInnerHTML={{ __html: data.summary_card.content_p1_html }}
                    />
                    <div className="relative pl-6 border-l-2 border-blue-500/30">
                       <p 
                            className="text-lg md:text-xl font-light leading-relaxed text-slate-400"
                            dangerouslySetInnerHTML={{ __html: data.summary_card.content_quote_html }}
                       />
                    </div>
                 </div>

                 <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                    <div className="relative w-14 h-14 shrink-0">
                       <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur opacity-40"></div>
                       <img 
                          className="relative w-full h-full rounded-full object-cover border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" 
                          alt="Analyst" 
                          src={data.summary_card.analyst.avatar_url} 
                       />
                       <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#0B1221] rounded-full flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-[#0B1221]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="text-lg text-white font-bold tracking-wide">{data.summary_card.analyst.name}</div>
                       <div className="flex items-center gap-2 mt-1">
                          {data.summary_card.analyst.tags.map((tag, idx) => (
                              <span key={idx} className={cn(
                                  "text-xs flex items-center gap-1",
                                  idx === 0 ? "font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5" : "font-bold text-blue-400"
                              )}>
                                 {idx === 1 && (
                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                     </svg>
                                 )}
                                 {tag}
                              </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* === RIGHT COLUMN: Strategy List === */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                 
                 {/* Top Box: Strategy Title */}
                 <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-[28px] p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{data.strategy_card.top_label}</div>
                       <div className="flex flex-col gap-1">
                          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{data.strategy_card.main_title}</h3>
                          <div className="text-sm font-medium text-blue-400 font-[Inter] tracking-wider uppercase opacity-80">{data.strategy_card.sub_title}</div>
                       </div>
                    </div>
                 </div>

                 {/* Bottom Box: Action List */}
                 <div className="bg-[#020617]/60 backdrop-blur-xl border border-white/5 rounded-[28px] p-2 flex-1 flex flex-col">
                    <div className="px-6 py-4 flex items-center justify-between">
                       <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{data.strategy_card.list_header}</h4>
                       <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                          <span className="text-[10px] text-orange-400 font-bold">{data.strategy_card.list_status}</span>
                       </div>
                    </div>

                    <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                       {data.strategy_card.list_items.map((item) => {
                           const isWarning = item.type === "warning";
                           
                           // Dynamic Styles based on Type
                           const containerClass = isWarning 
                               ? "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/20" 
                               : "bg-white/5 hover:bg-blue-500/10 border-white/5 hover:border-blue-500/30";
                           
                           const iconBgClass = isWarning
                               ? "bg-orange-500/20 text-orange-400"
                               : "bg-white/5 group-hover:bg-blue-500/20 text-slate-400 group-hover:text-blue-400";
                           
                           const titleClass = isWarning
                               ? "text-orange-100 group-hover:text-white"
                               : "text-slate-200 group-hover:text-white";

                           const subClass = isWarning
                               ? "text-orange-200/60"
                               : "text-slate-500 group-hover:text-blue-200/60";

                           const tagClass = isWarning
                               ? "text-orange-950 bg-orange-500"
                               : "text-blue-300 bg-blue-500/10 border border-blue-500/20";

                           return (
                               <div key={item.id} className={cn("group relative border rounded-2xl p-4 transition-all duration-300", containerClass)}>
                                  <div className="flex justify-between items-start">
                                     <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors", iconBgClass)}>
                                           {ICON_MAP[item.icon_key] || ICON_MAP["default"]}
                                        </div>
                                        {/* Text */}
                                        <div>
                                           <div className={cn("text-base font-bold transition-colors", titleClass)}>
                                              {item.title}
                                           </div>
                                           <div className={cn("text-xs mt-0.5 transition-colors", subClass)}>
                                              {item.desc}
                                           </div>
                                        </div>
                                     </div>
                                     {/* Tag */}
                                     <span className={cn("text-[9px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider shrink-0 mt-1", tagClass)}>
                                        {item.tag}
                                     </span>
                                  </div>
                               </div>
                           );
                       })}
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
